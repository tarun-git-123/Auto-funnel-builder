import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorPopUp from "./ErrorPopUp";
import ProcessingLoader from "./LoaderProcessing";
import { useFormFields } from "../../hooks/useFormFields";
import { useRouter } from "next/navigation";
import config from "../../config.json"

interface OrderSummary {
  name: string | null;
  price: number
  product1_id: string;
}

interface FormProps {
  orderSummary: OrderSummary;
}

const Form: React.FC<FormProps> = ({ orderSummary }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [billShipSame, setBillShipSame] = useState<number>(1);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    country: "US",
    shipCountry: "US",
  });

  const {
    shippingFieldsState,
    billingFieldsState,
    cardFieldsState,
    updateBillingRegionOptions,
    updateShippingRegionOptions,
    regians
  } = useFormFields();

  const router = useRouter();

  useEffect(() => {
    updateBillingRegionOptions(formValues.country as keyof typeof regians);
    updateShippingRegionOptions(formValues.shipCountry as keyof typeof regians);
  }, [formValues.country, formValues.shipCountry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // List of fields to restrict to digits only
    const onlyNumericFields = [
      "shipPostalCode",
      "postalCode",
      "phoneNumber",
      "cardNumber",
      "cardSecurityCode",
      "cardMonth",
      "cardYear",
    ];

    const newValue = onlyNumericFields.includes(name)
      ? value.replace(/\D/g, "")
      : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    shippingFieldsState.forEach((field) => {
      if (!formValues[field.name] && field.required) {
        newErrors.push(`${field.errorMessage}`);
      }
    });

    if (!billShipSame) {
      billingFieldsState.forEach((field) => {
        if (!formValues[field.name] && field.required) {
          newErrors.push(`${field.errorMessage}`);
        }
      });
    }

    cardFieldsState.flat().forEach((field) => {
      if (!formValues[field.name] && field.required) {
        newErrors.push(`${field.errorMessage}`);
      }
    });

    if (!acceptedTerms) {
      newErrors.push("You must accept the terms and conditions.");
    }

    if (newErrors.length > 0) {
      setFormErrors(newErrors); // trigger the popup
      return;
    }

    const allFormValues: Record<string, string> = {
      ...formValues,
      billShipSame: billShipSame.toString(),
      product1_id: orderSummary.product1_id?.toString(),
      paySource: "CREDITCARD",
    };

    console.log(allFormValues);

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allFormValues }),
      });
      const res = await response.json();
      console.log(res);
      if (res.result === "MERC_REDIRECT") {
        window.location.href = res.message.url;
      } else if (res.result === "SUCCESS") {
        router.push(`/thank-you?order_id=${res.message.orderId}`);
        return;
      } else {
        console.log(res.result.message);
        newErrors.push(`${res.message}`);
        setFormErrors(newErrors);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="lg:w-[67%] flex flex-col md:flex-row gap-4"
      >
        <div className="glass-effect lg:w-[50%] p-4">
          {/* shipping form */}
          <div>
            <div className="grid grid-cols-1 mb-6 gap-4">
              <h2 className="text-xl font-semibold w-full">
                Shipping Information
              </h2>
              {shippingFieldsState.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium mb-1"
                  >
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      defaultValue={formValues[field.name]}
                      id={field.name}
                      name={field.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg "
                    >
                      {field.options &&
                        field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      value={formValues[field.name] || ""}
                      name={field.name}
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg "
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* billing form */}
          <div className="mb-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isbillsame"
                  name="isbillsame"
                  type="checkbox"
                  onChange={(e) => {
                    setBillShipSame(e.target.checked ? 1 : 0);
                  }}
                  checked={billShipSame === 1}
                  className="h-4 w-4 text-[#0078D7] focus:ring-[#00B2A9] border-gray-400 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isbillsame" className="font-medium">
                  Billing Address is same as Shipping Address
                </label>
              </div>
            </div>
          </div>

          {!billShipSame && (
            <div>
              <div className="grid grid-cols-1 mb-6 gap-4">
                <h2 className="text-xl font-semibold w-full">
                  Billing Information
                </h2>

                {billingFieldsState.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-1"
                    >
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        defaultValue={formValues[field.name]}
                        id={field.name}
                        name={field.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg"
                      >
                        {field.options &&
                          field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formValues[field.name] || ""}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg "
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="glass-effect lg:w-[50%] p-4">
          {/* card information */}
          <h3 className="text-lg font-medium mb-4">Card Details</h3>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {cardFieldsState.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid gap-4 ${row.length === 2 ? "lg:grid-cols-2" : "grid-cols-1"
                  }`}
              >
                {row.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-1"
                    >
                      {field.label}
                    </label>
                    {field.type === "select" ? (
                      <select
                        defaultValue={formValues[field.name]}
                        id={field.name}
                        name={field.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg "
                      >
                        <option value="">{field.label}</option>
                        {field.options &&
                          field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        maxLength={field.maxLength}
                        value={formValues[field.name] || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-white border border-gray-400 rounded-lg "
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) =>
                    setAcceptedTerms(e.target.checked ? true : false)
                  }
                  className="h-4 w-4 text-[#0078D7] focus:ring-[#00B2A9] border-gray-400 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium">
                  I agree to be charged ${orderSummary.price.toFixed(2)} for{" "}
                  {orderSummary?.name} and accept the{" "}
                  <Link
                    href="/legal/terms"
                    className="text-[#00B2A9] hover:underline"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-6 text-sm text-gray-400">
              We accept credit card payments only. Your payment information is
              securely processed.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium ${isSubmitting
                ? "bg-gray-600"
                : "button-glow hover:opacity-90"
                }`}
              style={{
                backgroundImage: `linear-gradient(to right, ${config.primaryColor}, ${config.secondaryColor})`,
              }}
            >
              {isSubmitting ? "Processing..." : `Pay $${orderSummary.price.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
      {formErrors.length > 0 && (
        <ErrorPopUp setFormErrors={setFormErrors} formErrors={formErrors} />
      )}
      {isSubmitting && <ProcessingLoader />}
    </>
  );
};

export default Form;

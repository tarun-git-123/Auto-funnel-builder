import { useState } from 'react';

const currentYear = new Date().getFullYear();

interface SelectOption {
    label: string;
    value: string;
}

interface FormField {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    maxLength?: number;
    required?: boolean;
    options?: SelectOption[];
    errorMessage?: string;
}

const regians = {
    US: [
        { label: "Select State", value: "" },
        { label: "Alabama", value: "AL" },
        { label: "Alaska", value: "AK" },
        { label: "Arizona", value: "AZ" },
        { label: "Arkansas", value: "AR" },
        { label: "California", value: "CA" },
        { label: "Colorado", value: "CO" },
        { label: "Connecticut", value: "CT" },
        { label: "Delaware", value: "DE" },
        { label: "Florida", value: "FL" },
        { label: "Georgia", value: "GA" },
        { label: "Hawaii", value: "HI" },
        { label: "Idaho", value: "ID" },
        { label: "Illinois", value: "IL" },
        { label: "Indiana", value: "IN" },
        { label: "Iowa", value: "IA" },
        { label: "Kansas", value: "KS" },
        { label: "Kentucky", value: "KY" },
        { label: "Louisiana", value: "LA" },
        { label: "Maine", value: "ME" },
        { label: "Maryland", value: "MD" },
        { label: "Massachusetts", value: "MA" },
        { label: "Michigan", value: "MI" },
        { label: "Minnesota", value: "MN" },
        { label: "Mississippi", value: "MS" },
        { label: "Missouri", value: "MO" },
        { label: "Montana", value: "MT" },
        { label: "Nebraska", value: "NE" },
        { label: "Nevada", value: "NV" },
        { label: "New Hampshire", value: "NH" },
        { label: "New Jersey", value: "NJ" },
        { label: "New Mexico", value: "NM" },
        { label: "New York", value: "NY" },
        { label: "North Carolina", value: "NC" },
        { label: "North Dakota", value: "ND" },
        { label: "Ohio", value: "OH" },
        { label: "Oklahoma", value: "OK" },
        { label: "Oregon", value: "OR" },
        { label: "Pennsylvania", value: "PA" },
        { label: "Rhode Island", value: "RI" },
        { label: "South Carolina", value: "SC" },
        { label: "South Dakota", value: "SD" },
        { label: "Tennessee", value: "TN" },
        { label: "Texas", value: "TX" },
        { label: "Utah", value: "UT" },
        { label: "Vermont", value: "VT" },
        { label: "Virginia", value: "VA" },
        { label: "Washington", value: "WA" },
        { label: "West Virginia", value: "WV" },
        { label: "Wisconsin", value: "WI" },
        { label: "Wyoming", value: "WY" }
    ],
    FR: [
        { label: "Select Region", value: "" },
        { label: "Auvergne-Rhône-Alpes", value: "auvergne-rhone-alpes" },
        { label: "Bourgogne-Franche-Comté", value: "bourgogne-franche-comte" },
        { label: "Bretagne", value: "bretagne" },
        { label: "Centre-Val de Loire", value: "centre-val-de-loire" },
        { label: "Corse", value: "corse" },
        { label: "Grand Est", value: "grand-est" },
        { label: "Hauts-de-France", value: "hauts-de-france" },
        { label: "Île-de-France", value: "ile-de-france" },
        { label: "Normandie", value: "normandie" },
        { label: "Nouvelle-Aquitaine", value: "nouvelle-aquitaine" },
        { label: "Occitanie", value: "occitanie" },
        { label: "Pays de la Loire", value: "pays-de-la-loire" },
        { label: "Provence-Alpes-Côte d'Azur", value: "provence-alpes-cote-d-azur" },
        { label: "Guadeloupe", value: "guadeloupe" },
        { label: "Martinique", value: "martinique" },
        { label: "Guyane", value: "guyane" },
        { label: "La Réunion", value: "la-reunion" },
        { label: "Mayotte", value: "mayotte" }
    ]
};

const countries = [
    { label: "United States", value: "US" },
    { label: "France", value: "FR" }
];

const months = Array.from({ length: 12 }, (_, i) => {
    const value = String(i + 1).padStart(2, '0');
    return { label: value, value };
});

const years = Array.from({ length: 15 }, (_, i) => {
    const value = String(currentYear + i);
    return { label: value, value };
});

const shippingFields: FormField[] = [
    { label: "First Name", placeholder: "Your first name", type: "text", name: "shipFirstName", errorMessage: "Please enter your first name!", required: true },
    { label: "Last Name", placeholder: "Your last name", type: "text", name: "shipLastName", errorMessage: "Please enter your last name!", required: true },
    { label: "Address Line 1", placeholder: "Address line 1", type: "text", name: "shipAddress1", errorMessage: "Please enter your address!", required: true },
    { label: "Address Line 2", placeholder: "Address line 2 (optional)", type: "text", name: "shipAddress2", errorMessage: "Please enter your address line 2!" },
    { label: "Postal Code", placeholder: "Your postal code", type: "tel", name: "shipPostalCode", maxLength: 10, errorMessage: "Please enter a valid postal code!", required: true },
    { label: "Country", placeholder: "Select a country", type: "select", name: "shipCountry", errorMessage: "Please select your country!", options: countries, required: true },
    { label: "State", placeholder: "Your state", type: "select", name: "shipState", options: [], errorMessage: "Please select your state!", required: true },
    { label: "City", placeholder: "Your city", type: "text", name: "shipCity", errorMessage: "Please enter your city!", required: true },
    { label: "Phone Number", placeholder: "Your phone number", type: "tel", maxLength: 15, name: "phoneNumber", errorMessage: "Please enter a valid phone number!", required: true },
    { label: "Email", placeholder: "you@example.com", type: "email", name: "emailAddress", errorMessage: "Please enter a valid email address!", required: true },
];

const billingFields: FormField[] = [
    { label: "Billing First Name", placeholder: "Your first name", type: "text", name: "firstName", errorMessage: "Please enter your billing first name!", required: true },
    { label: "Billing Last Name", placeholder: "Your last name", type: "text", name: "lastName", errorMessage: "Please enter your billing last name!", required: true },
    { label: "Billing Address", placeholder: "Address line 1", type: "text", name: "address1", errorMessage: "Please enter your billing address!", required: true },
    { label: "Postal Code", placeholder: "Your postal code", type: "tel", name: "postalCode", maxLength: 10, errorMessage: "Please enter a valid postal code!", required: true },
    { label: "City", placeholder: "Your city", type: "text", name: "city", errorMessage: "Please enter your billing city!", required: true },
    { label: "Country", placeholder: "Select a country", type: "select", name: "country", errorMessage: "Please select ypur billing country!", options: countries, required: true },
    { label: "Billing State/Region", placeholder: "Your state or region", type: "select", name: "state", options: [], errorMessage: "Please select your billing state!", required: true },

];

const cardFields: FormField[][] = [
    [
        { label: "Card Number", placeholder: "1234 5678 9012 3456", type: "tel", name: "cardNumber", maxLength: 16, errorMessage: "Please enter a valid credit card number!", required: true },
    ],
    [
        { label: "Month", placeholder: "MM", type: "select", name: "cardMonth", options: months, errorMessage: "Please select a valid expiration month!", required: true },
        { label: "Year", placeholder: "YYYY", type: "select", name: "cardYear", options: years, errorMessage: "Please select a valid expiration year!", required: true },
    ],
    [
        { label: "CVV Code", placeholder: "123", type: "tel", name: "cardSecurityCode", maxLength: 4, errorMessage: "Please enter a valid CVV code!", required: true },
    ],
];

export function useFormFields() {
    const [shippingFieldsState, setShippingFieldsState] = useState<FormField[]>(shippingFields);
    const [billingFieldsState, setBillingFieldsState] = useState<FormField[]>(billingFields);
    const [cardFieldsState, setCardFieldsState] = useState<FormField[][]>(cardFields);

    const updateShippingRegionOptions = (countryCode: keyof typeof regians) => {
        setShippingFieldsState((fields) =>
            fields.map((field) =>
                field.name === "shipState"
                    ? { ...field, options: regians[countryCode] || [] }
                    : field
            )
        );
    };

    // You could do similar for billing if you want:
    const updateBillingRegionOptions = (countryCode: keyof typeof regians) => {
        setBillingFieldsState((fields) =>
            fields.map((field) =>
                field.name === "state"
                    ? { ...field, options: regians[countryCode] || [] }
                    : field
            )
        );
    };

    return {
        shippingFieldsState,
        setShippingFieldsState,
        billingFieldsState,
        setBillingFieldsState,
        cardFieldsState,
        setCardFieldsState,
        updateShippingRegionOptions,
        updateBillingRegionOptions,
        regians
    };
}
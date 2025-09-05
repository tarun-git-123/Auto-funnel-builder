import config from "../../../config.json";

export const termsContent = `
<h2>Terms of Service</h2>
<p>Last updated: 25/02/2025</p>

<p>By placing an order through this website, you agree to the terms and conditions set forth below. Please read through these terms carefully before placing your order and print a copy for future reference. Please also read our Privacy Policy regarding personal information provided by you, which is incorporated herein by reference.</p>

<p>${config.company.name} is a service of ${config.company.name}<br>
EIN: ${config.company.ein}<br>
${config.company.address}<br>
Phone: ${config.company.phone}<br>
Email: ${config.company.email}</p>

<h3>${config.company.name} Career Services Packages Offered:</h3>

<h4>Resume/CV Packages</h4>
<ul>
  <li>Basic: $9.99</li>
  <li>Standard: $19.50</li>
  <li>Premium: $29.90</li>
  <li>Enhanced: $39.99</li>
  <li>Ultra: $49.90</li>
</ul>

<h4>Interview Packages</h4>
<ul>
  <li>Basic: $59.50</li>
  <li>Standard: $69.99</li>
  <li>Enhanced: $79.90</li>
  <li>Premium: $99.99</li>
  <li>Expert: $109.90</li>
  <li>Ultra: $119.50</li>
</ul>

<h4>Application Packages</h4>
<ul>
  <li>Basic: $29.90</li>
  <li>Standard: $49.90</li>
  <li>Enhanced: $59.50</li>
  <li>Professional: $89.50</li>
  <li>Premium: $119.50</li>
</ul>

<h3>Payment Methods</h3>
<p>We accept payment by credit card only. All major credit cards (Visa, MasterCard, American Express, Discover) are accepted. Payment is processed securely through our payment processor. All charges will appear as &quot;&quot; on your bank statement.</p>

<p>You will receive a confirmation email with details about accessing your career preparation services and next steps within 24 hours of placing your order.</p>

<p>Any use of this site is governed by the policies, terms and conditions set forth below.</p>

<h3>Trademarks & Copyrights</h3>
<p>All text, graphics, photographs or other images, button icons, audio clips, logos, slogans, trade names and other contents on the website of  (collectively &quot;content&quot;) exclusively belong to ${config.company.name} or its appropriate content suppliers or licensors and may not be used, copied, limited, modified, displayed, published, sold, publicly performed, distributed or commercially exploited, in whole or in part, without the prior written permission of ${config.company.name} or the applicable trademark holder. You may not use any meta-tags or any other &quot;hidden text&quot; utilizing any name, trademark, or service name of ${config.company.name} without ${config.company.name}&apos;s prior written permission. In addition, the style of the Site, including all page headers, custom graphics, button icons, and scripts, is the service mark and trademark of ${config.company.name} which may not be copied, imitated, or used (in whole or in part) without ${config.company.name}&apos;s prior written permission.</p>

<p>Reference to any services, processes or other information, by trade name, trademark or otherwise, which does not constitute or imply endorsement, sponsorship or recommendation thereof reserved by ${config.company.name}. All rights not expressly granted are reserved by ${config.company.name}. Violators will be prosecuted to the full extent of the law.</p>

<h3>Copyright of Content</h3>
<p>When you submit resumes, cover letters, materials, or other content to ${config.company.name} for career services (collectively &quot;Client Content&quot;), you retain ownership of your original Client Content. However, by submitting Client Content to ${config.company.name}, you grant ${config.company.name} a non-exclusive, royalty-free license to use, modify, and edit such Client Content solely for the purpose of providing the career preparation services you have purchased.</p>

<p>Unless explicitly agreed upon in writing, ${config.company.name} may use anonymized versions of your documents in its portfolio, samples, or marketing materials. If you wish to keep your documents completely private, you must request this in writing before the service process begins.</p>

<p>${config.company.name} does not claim ownership of your original documents or the underlying information contained within your materials. However, the specific edits, formatting, wording improvements, and other techniques applied by ${config.company.name} are the intellectual property of ${config.company.name}.</p>

<p>${config.company.name} is not responsible for ensuring that all Client Content submitted for services is free from copyright infringement or other intellectual property violations. It is your responsibility to ensure you have the proper rights to use all elements (including text, images, etc.) included in the materials you submit.</p>

<h3>About Modifications</h3>
<p>${config.company.name} reserves the right to change or modify any of the terms and conditions contained in these Site Terms, or any policy of the site, from time to time at any time and in its sole discretion. If ${config.company.name} decides to change these Site Terms or a Site policy, it will post a new version on the site and update the effective date set forth above. Any changes or modifications to these Site Terms will be effective upon posting of the revisions. Your continued use of the site following the posting of any changes or modifications constitute your acceptance of such changes or modifications.</p>

<h3>Refunds Policy</h3>
<p>Refunds may be requested within thirty (30) days of the date you received the final career services deliverables.</p>
<p>Due to the custom nature of our career preparation services, refunds are handled on a case-by-case basis. If you are not satisfied with your delivered documents or services, we first encourage you to use the revision rounds included in your package. If after the included revisions you are still not satisfied, please contact our customer service team.</p>

<p>In order to request a refund, contact customer service by phone or email within 30 days of receipt of the final deliverables. Your refund, if approved, will be credited back to your original payment method, and may take up to 3-5 business days to process, depending on your payment provider.</p>

<p>If you have any questions, please call at ${config.company.phone} or email at ${config.company.email}.</p>
`; 
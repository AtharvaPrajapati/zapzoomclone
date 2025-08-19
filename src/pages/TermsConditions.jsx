import PageHeader from '../components/PageHeader'

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read these terms and conditions carefully before using our services."
        backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              <strong>Last updated:</strong> January 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing and using ZapZoom's website and services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Products and Services</h2>
              <p className="text-gray-600 mb-4">
                ZapZoom provides ethnic wear and fashion accessories for women. All product descriptions, 
                images, and prices are subject to change without notice.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Product colors may vary slightly due to screen settings</li>
                <li>Sizes are approximate and may vary by manufacturer</li>
                <li>We reserve the right to limit quantities</li>
                <li>Product availability is subject to stock</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ordering and Payment</h2>
              <p className="text-gray-600 mb-4">
                When you place an order, you agree to provide accurate and complete information.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>Payment must be made at the time of ordering</li>
                <li>We accept various payment methods including cards, UPI, and COD</li>
                <li>Orders are subject to acceptance and availability</li>
                <li>We reserve the right to cancel orders for any reason</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
              <p className="text-gray-600 mb-4">
                We strive to deliver your orders in a timely manner.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Free shipping on orders above ₹999</li>
                <li>Shipping charges apply for orders below ₹999</li>
                <li>Risk of loss passes to you upon delivery</li>
                <li>We are not responsible for delays due to external factors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns and Exchanges</h2>
              <p className="text-gray-600 mb-4">
                We want you to be satisfied with your purchase.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Returns accepted within 7 days of delivery</li>
                <li>Items must be unused, unwashed, and with original tags</li>
                <li>Custom or personalized items cannot be returned</li>
                <li>Return shipping costs may apply</li>
                <li>Refunds processed within 7-10 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Accounts</h2>
              <p className="text-gray-600 mb-4">
                You are responsible for maintaining the confidentiality of your account.
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide accurate and current information</li>
                <li>Keep your password secure</li>
                <li>Notify us immediately of unauthorized use</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                All content on this website is owned by ZapZoom or its licensors and is protected by 
                copyright and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                ZapZoom shall not be liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms shall be governed by and construed in accordance with the laws of India. 
                Any disputes shall be subject to the jurisdiction of courts in Kanpur, Uttar Pradesh.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these terms, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">
                  <strong>ZapZoom Technologies Private Limited</strong><br />
                  <strong>Email:</strong> zapzoom413@gmail.com<br />
                  <strong>Phone:</strong> +91 8090821861<br />
                  <strong>Address:</strong> Arazi No-965, Plot No-18, Part-4, Ganga Ganj, Panki, Kanpur, Uttar Pradesh, 208020
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditions

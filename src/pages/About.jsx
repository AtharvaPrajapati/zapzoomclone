import { Award, Users, Heart, Sparkles, MapPin, Phone, Mail, Clock, FileText, Shield } from 'lucide-react'
import PageHeader from '../components/PageHeader'

const AboutPage = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest fabrics and materials to ensure every piece meets our high standards of quality and craftsmanship."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We strive to provide exceptional service and support at every step."
    },
    {
      icon: Heart,
      title: "Passion for Fashion",
      description: "We are passionate about creating beautiful, comfortable, and stylish ethnic wear that celebrates Indian culture and tradition."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We continuously innovate our designs and processes to bring you the latest trends while maintaining traditional elegance."
    }
  ]

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "500+", label: "Unique Designs" },
    { number: "50+", label: "Cities Served" },
    { number: "5", label: "Years of Excellence" }
  ]


  return (
    <div className="min-h-screen">
      <PageHeader
        title="About ZapZoom"
        subtitle="Welcome to ZapZoom Technologies Private Limited, your premier destination for elegant and stylish women's ethnic fashion. Based in the heart of India, we are passionate about providing high-quality, trendy, and comfortable ethnic wear."
        backgroundImage="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Groomysolutions Private Limited began as a vision to make beautiful,
                  high-quality ethnic wear accessible to women across India. What started as a small venture
                  has now grown into a trusted brand recognized for its dedication to quality and style.
                </p>
                <p>
                  Our journey is deeply rooted in the rich textile heritage of India, blended with
                  contemporary design sensibilities. We believe every woman deserves to feel confident and
                  graceful in what she wears—be it for a special occasion or everyday elegance.
                </p>
                <p>
                  Today, Groomysolutions Private Limited proudly serves thousands of customers in 50+ cities,
                  offering a carefully curated collection of sarees, kurtis, lehengas, and accessories.
                  Each piece celebrates the timeless beauty of Indian fashion while embracing modern trends.
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* GST Registration */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Information</h2>
            <p className="text-lg text-gray-600">
              We are a legally registered business with proper certifications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">GST Registration</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium">Registration Number:</span>
                  <span>06AAMCG4071F1ZQ</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Legal Name:</span>
                  <span>Groomy Workforce Solutions Private Limited</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Trade Name:</span>
                  <span>Groomy Workforce Solutions Private Limited</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Constitution:</span>
                  <span>Private Limited Company</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date of Registration:</span>
                  <span>06/06/2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">State:</span>
                  <span>Haryana</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Business Verification</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>GST Registered Business</span>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Government Verified</span>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Legally Compliant</span>
                </div>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span>Secure Transactions</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  <strong>Note:</strong> All transactions are conducted under proper GST compliance.
                  GST invoices are provided for all purchases as per government regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-primary-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
            <p className="text-xl text-primary-100">
              Experience our collection in person at our flagship store
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-4 text-primary-200" />
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-primary-100">
                House No: 2056A,
                Housing Board Colony<br></br>
                NEAR ESI DISPENSARY Sector 55<br />
                Faridabad Haryana 121015
              </p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-4 text-primary-200" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-primary-100">+91 80XXXXXXXX</p>
            </div>
            <div>
              <Mail className="h-8 w-8 mx-auto mb-4 text-primary-200" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-primary-100">amanmalhaan12@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

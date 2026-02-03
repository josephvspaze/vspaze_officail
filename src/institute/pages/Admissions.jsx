import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, CreditCard, Calculator, CheckCircle, Clock, Users, Award } from 'lucide-react';
import api from '../../utils/api';

const Admissions = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loanAmount, setLoanAmount] = useState('45000');
  const [tenure, setTenure] = useState(12);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      const coursesData = response.data.courses || [];
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const calculateEMI = (principal, rate, months) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const paymentPlans = [
    { name: 'Full Payment', discount: '10%', description: 'Pay full amount upfront and save 10%', icon: DollarSign },
    { name: '3 Months EMI', interest: '0%', description: 'No interest for 3 months installment', icon: Calendar },
    { name: '6 Months EMI', interest: '5%', description: 'Low interest rate for 6 months', icon: CreditCard },
    { name: '12 Months EMI', interest: '8%', description: 'Extended payment period with competitive rates', icon: Calculator }
  ];

  const scholarships = [
    { name: 'Merit Scholarship', eligibility: '85%+ in graduation', benefit: 'Up to 30% fee waiver', icon: Award },
    { name: 'Early Bird Discount', eligibility: 'Register 30 days before batch', benefit: '15% discount', icon: Clock },
    { name: 'Referral Bonus', eligibility: 'Refer a friend who enrolls', benefit: '₹5,000 cashback', icon: Users },
    { name: 'Women in Tech', eligibility: 'Female candidates', benefit: '20% fee reduction', icon: CheckCircle }
  ];

  const admissionProcess = [
    { step: 1, title: 'Online Registration', description: 'Fill the registration form with your details' },
    { step: 2, title: 'Fee Payment', description: 'Choose payment plan and complete fee payment' },
    { step: 3, title: 'Start Learning', description: 'Access live classes and course materials instantly' },
    { step: 4, title: 'Get Certified', description: 'Complete course and receive industry-recognized certificate' },
    { step: 5, title: 'Career Support', description: 'Get placement assistance and job opportunities' }
  ];

  const getCurrentDate = () => {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  };

  const getDateRange = (startDays, endDays) => {
    const start = new Date();
    start.setDate(start.getDate() + startDays);
    const end = new Date();
    end.setDate(end.getDate() + endDays);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
  };

  const importantDates = [
    { event: 'Early Bird Registration', date: getDateRange(0, 30), status: 'Open' },
    { event: 'Regular Admission', date: getDateRange(31, 75), status: 'Open' },
    { event: 'Late Admission', date: getDateRange(76, 90), status: 'Upcoming' },
    { event: 'Batch Start Date', date: 'Every Monday', status: 'Rolling' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions & Fees</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Transparent pricing, flexible payment options, and scholarship opportunities
          </p>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Course Fee Structure</h2>
            <p className="text-xl text-gray-600">Complete breakdown of fees for all courses</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-500 transition-all w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-teal-600">{course.fee}</span>
                  <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.duration}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Course Fee:</span>
                    <span className="font-semibold">{course.fee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Registration:</span>
                    <span className="font-semibold">₹2,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Materials:</span>
                    <span className="font-semibold">₹1,500</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-teal-600">₹{(parseInt(course.fee) || 0) + 3500}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCourse(course);
                    setLoanAmount(course.fee?.toString() || '45000');
                    document.getElementById('emi-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 text-white py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Calculate EMI
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section id="emi-calculator" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-black">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">EMI Calculator</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                  <select
                    value={selectedCourse?._id || ''}
                    onChange={(e) => {
                      const course = courses.find(c => c._id === e.target.value);
                      setSelectedCourse(course);
                      setLoanAmount(course?.fee?.toString() || '45000');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure (Months)</label>
                  <select
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value={3}>3 Months (0% Interest)</option>
                    <option value={6}>6 Months (5% Interest)</option>
                    <option value={12}>12 Months (8% Interest)</option>
                  </select>
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-gray-900">
                <h3 className="text-xl font-bold text-gray-900 mb-4">EMI Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Principal Amount:</span>
                    <span className="font-semibold">₹{parseInt(loanAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold">{tenure === 3 ? '0%' : tenure === 6 ? '5%' : '8%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure:</span>
                    <span className="font-semibold">{tenure} months</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Monthly EMI:</span>
                    <span className="text-teal-600">
                      ₹{calculateEMI(parseInt(loanAmount), tenure === 3 ? 0 : tenure === 6 ? 5 : 8, tenure).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Flexible Payment Plans</h2>
            <p className="text-xl text-gray-600">Choose the payment option that works best for you</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentPlans.map((plan, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-teal-500 hover:shadow-lg transition-all">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.discount && <span className="text-cyan-600 font-semibold">{plan.discount} OFF</span>}
                  {plan.interest && <span className="text-teal-600 font-semibold">{plan.interest} Interest</span>}
                </div>
                <p className="text-gray-600 text-sm text-center">{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Scholarship Programs</h2>
            <p className="text-xl text-gray-600">Financial assistance for deserving candidates</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scholarships.map((scholarship, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.3)'}}>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <scholarship.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{scholarship.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p className="text-sm font-semibold text-teal-600">{scholarship.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Simple 5-step process to join Vspaze Institute</p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-400"></div>
            
            <div className="space-y-12 md:space-y-12">
              {admissionProcess.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Down Arrow */}
                  {idx > 0 && (
                    <div className="flex justify-center mb-4">
                      <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}

                  {/* Desktop View - Circle and Content at same level */}
                  <div className="hidden md:flex relative items-center justify-center">
                    {/* Content Box - Positioned to left or right */}
                    <div className={`absolute ${idx % 2 === 0 ? 'right-1/2 pr-8 md:pr-12' : 'left-1/2 pl-8 md:pl-12'} w-5/12`}>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)'}}>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>

                    {/* Center Circle - On the line */}
                    <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>

                  {/* Mobile View - Circle above, Content below */}
                  <div className="md:hidden flex flex-col items-center">
                    {/* Center Circle - On the line */}
                    <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-4">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>

                    {/* Content Box - Below circle, full width */}
                    <div className="w-full px-4">
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-teal-400" style={{boxShadow: '0 0 15px rgba(20, 184, 166, 0.2)'}}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-xl text-gray-600">Key admission dates and deadlines</p>
          </div>
          <div className="space-y-4">
            {importantDates.map((date, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md flex items-center justify-between border border-teal-400" style={{boxShadow: '0 0 10px rgba(20, 184, 166, 0.2)'}}>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{date.event}</h3>
                  <p className="text-gray-600">{date.date}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  date.status === 'Open' ? 'bg-green-100 text-green-800' :
                  date.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-teal-100 text-teal-800'
                }`}>
                  {date.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-900 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">Apply now and secure your seat in the next batch</p>
          <a
            href="/student-registration"
            className="inline-flex items-center space-x-2 bg-white text-teal-700 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Apply Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Admissions;

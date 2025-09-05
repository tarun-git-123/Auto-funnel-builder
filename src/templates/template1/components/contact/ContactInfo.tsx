"use client";

import config from "../../config.json"

export default function ContactInfo() {
  return (
    <div
      className="bg-[#1e1e1e] border border-gray-800/30 text-white rounded-lg shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-vid-red-500 to-vid-orange-500">Contact Information</h2>
      
      <div className="space-y-8">
        <div className="flex items-start space-x-4">
          <div className="bg-vid-red-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-vid-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-orange-400">Our Location</h3>
            <p className="mt-1">{config.company.address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-vid-red-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-vid-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-orange-400">Email Us</h3>
            <p className="mt-1">
              <a 
                href={`mailto:${config.company.email}`}
                className="hover:text-vid-red-400 transition-colors duration-200"
              >
                {config.company.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="bg-vid-red-500/10 p-3 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-vid-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-vid-orange-400">Call Us</h3>
            <p className="mt-1">
              <a 
                href={`tel:${config.company.phone}`}
                className="hover:text-vid-red-400 transition-colors duration-200"
              >
                {config.company.phone}
              </a>
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Monday to Friday, 9AM to 6PM EST
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-lg font-medium text-vid-orange-400 mb-4">Business Hours</h3>
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>9:00 AM - 6:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Saturday:</span>
            <span>10:00 AM - 4:00 PM</span>
          </p>
          <p className="flex justify-between">
            <span>Sunday:</span>
            <span>Closed</span>
          </p>
        </div>
      </div>
    </div>
  );
} 
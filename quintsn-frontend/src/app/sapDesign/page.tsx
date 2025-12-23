"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import BusinessOneHero from "@/components/ui/businessOneHero";
import React from "react";
import { CheckSquare } from "lucide-react";
import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <>
    <Navigation/>
    <div className="min-h-screen bg-gray-50 py-20 px-6">
        <BusinessOneHero/>
      <div className="max-w-7xl mx-auto mt-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is SAP Business By Design?
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
           Manage your fast-growing, mid-market business with a single cloud ERP solution to scale and compete without the
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-10">Financial Management</h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/img/AI.jpg" // update image path
              alt="SAP Business One Dashboard"
              width={600}
              height={400}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
            
          </div>
          

          {/* Text Content */}
          <div>
            <h3 className="mb-5 font-bold">SAP Business One Sales mobile app</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              SAP Business ByDesign delivers pre-built processes for everything from finance and sales to product management 
              and purchasing on a single, unified solution. Connect every function across your company with proven best practices 
              and in-depth analytics.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-800">
                <CheckSquare className="text-blue-600 w-5 h-5" />
            Intelligent cloud ERP: Streamlined end-to-end processes
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckSquare className="text-blue-600 w-5 h-5" />
                Instant value: Enables agility to quickly adapt to new opportunities
              </li>
              <li className="flex items-center gap-3 text-gray-800">
                <CheckSquare className="text-blue-600 w-5 h-5" />
               Business impact: Real-time analytics included to help improve profits and efficiency
              </li>
             
            </ul>

            
          </div>
        </div>
      </div>

       <div className="max-w-7xl mx-auto mt-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
           See how customers are succeeding with SAP
          </h2>

         
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/img/logo.png" // update image path
              alt="SAP Business One Dashboard"
              width={500}
              height={300}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
            
          </div>
          <div className="flex justify-center">
            <Image
              src="/img/logo.png" // update image path
              alt="SAP Business One Dashboard"
              width={500}
              height={300}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
            
          </div><div className="flex justify-center">
            <Image
              src="/img/logo.png" // update image path
              alt="SAP Business One Dashboard"
              width={500}
              height={300}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
            
          </div>

        </div>
        <a className="text-center">Browse more customer stories </a>
      </div>




      <div className="max-w-7xl mx-auto mt-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
           Finance
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          Manage your fast-growing, mid-market business with a single cloud ERP solution to scale and compete without the
          </p>

         
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              src="/img/AI.jpg" // update image path
              alt="SAP Business One Dashboard"
              width={600}
              height={400}
              className="w-full max-w-xl h-auto object-contain"
              priority
            />
            
          </div>
          

          {/* Text Content */}
          <div>
            <h3 className="mb-5 font-bold">Financial and managerial accounting</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Manage accounts for multiple operating units, currencies, and reporting standards.
            </p>

            <h3 className="mb-5 font-bold">Cash flow management</h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Use customer and supplier transaction data to get real-time visibility into your cash position.
            </p>


            
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

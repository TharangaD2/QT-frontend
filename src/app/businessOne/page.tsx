"use client";

import React, { useState } from "react";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import BusinessOneHero from "@/components/ui/businessOneHero";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/* ===================== DATA ===================== */

const features = [ 
  { title: "Financial Management", 
    description: "Improve margins, reduce errors, and drive more profitable decision-making with a complete set of tools for streamlined financial operations.", 
    subFeatures: [ 
      { title: "Accounting",
         description:"Automate the handling of key accounting processes, such as journal entries, accounts receivable, and accounts payable." 
      }, 
      { title: "Controlling", 
        description:"Manage cash flow, track fixed assets, control budgets, and monitor project costs with greater accuracy and efficiency." 
      }, 
      { title: "Fixed asset management", 
        description:"Simplify the management of your fixed assets with a virtual function, eliminating the need for repetitive manual data entry." 
      }, 
      { title: "Banking and reconciliation", 
        description:"Process reconciliations, bank statements, and payments faster through various methods including checks, cash, and bank transfers." 
      }, 
      { title: "Financial reporting and analysis", 
        description:"Create standard or customized reports from real-time data to improve your business planning and audit review processes." 
      }
       ], 
      }, 
     { title: "Sales and customer management", 
    description: "Oversee the entire sales process and customer lifecycle more efficiently – from initial contact to final sale, after-sales service, and support.", 
    subFeatures: [ 
      { title: "Sales and opportunity management",
         description:"Track all sales opportunities and lead activities throughout the sales cycle, from the first contact to deal closing." 
      }, 
      { title: "Marketing campaign management", 
        description:"Create, manage, and analyze marketing activities to turn prospects into customers and grow sales and profitability." 
      }, 
      { title: "Customer management", 
        description:"Store all critical customer data in one place by synchronizing and managing customer contacts stored in Microsoft Outlook." 
      }, 
      { title: "Service management", 
        description:"Craft and manage warranty contracts and service agreements efficiently, and enter and respond to service calls quickly." 
      }, 
      { title: "Reporting and analysis", 
        description:"Design detailed reports on all aspects of the sales process – from forecasting to pipeline tracking – by using templates." 
      },
       { title: "Mobile sales", 
        description:"Empower your entire sales organization to manage information on the move anytime, anywhere, and on any mobile device." 
      }
       ], 
      }, 
      { title: "Purchasing and inventory control", 
    description: "Improve margins, reduce errors, and drive more profitable decision-making with a complete set of tools for streamlined financial operations.", 
    subFeatures: [ 
      { title: "Accounting",
         description:"Automate the handling of key accounting processes, such as journal entries, accounts receivable, and accounts payable." 
      }, 
      { title: "Controlling", 
        description:"Manage cash flow, track fixed assets, control budgets, and monitor project costs with greater accuracy and efficiency." 
      }, 
      { title: "Fixed asset management", 
        description:"Simplify the management of your fixed assets with a virtual function, eliminating the need for repetitive manual data entry." 
      }, 
      { title: "Banking and reconciliation", 
        description:"Process reconciliations, bank statements, and payments faster through various methods including checks, cash, and bank transfers." 
      }, 
      { title: "Financial reporting and analysis", 
        description:"Create standard or customized reports from real-time data to improve your business planning and audit review processes." 
      }
       ], 
      }, 
      { title: "Business intelligence", 
    description: "Improve margins, reduce errors, and drive more profitable decision-making with a complete set of tools for streamlined financial operations.", 
    subFeatures: [ 
      { title: "Accounting",
         description:"Automate the handling of key accounting processes, such as journal entries, accounts receivable, and accounts payable." 
      }, 
      { title: "Controlling", 
        description:"Manage cash flow, track fixed assets, control budgets, and monitor project costs with greater accuracy and efficiency." 
      }, 
      { title: "Fixed asset management", 
        description:"Simplify the management of your fixed assets with a virtual function, eliminating the need for repetitive manual data entry." 
      }, 
      { title: "Banking and reconciliation", 
        description:"Process reconciliations, bank statements, and payments faster through various methods including checks, cash, and bank transfers." 
      }, 
      { title: "Financial reporting and analysis", 
        description:"Create standard or customized reports from real-time data to improve your business planning and audit review processes." 
      }
       ], 
      },  
      { title: "Analytics and reporting", 
    description: "Improve margins, reduce errors, and drive more profitable decision-making with a complete set of tools for streamlined financial operations.", 
    subFeatures: [ 
      { title: "Accounting",
         description:"Automate the handling of key accounting processes, such as journal entries, accounts receivable, and accounts payable." 
      }, 
      { title: "Controlling", 
        description:"Manage cash flow, track fixed assets, control budgets, and monitor project costs with greater accuracy and efficiency." 
      }, 
      { title: "Fixed asset management", 
        description:"Simplify the management of your fixed assets with a virtual function, eliminating the need for repetitive manual data entry." 
      }, 
      { title: "Banking and reconciliation", 
        description:"Process reconciliations, bank statements, and payments faster through various methods including checks, cash, and bank transfers." 
      }, 
      { title: "Financial reporting and analysis", 
        description:"Create standard or customized reports from real-time data to improve your business planning and audit review processes." 
      }
       ], 
      },  
]
     
/* ===================== PAGE ===================== */

export default function PrivacyPolicy() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Navigation />

      <div className="min-h-screen bg-gray-50 py-20 px-6">
        <BusinessOneHero />

        <div className="max-w-7xl mx-auto mt-10">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What is SAP Business One?
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
              A single, affordable ERP solution to manage your entire small
              business – from accounting and financials, purchasing, inventory,
              sales and customer relationships to reporting and analytics.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="flex justify-center">
              <Image
                src="/img/AI.jpg"
                alt="SAP Business One Dashboard"
                width={600}
                height={400}
                className="w-full max-w-xl h-auto object-contain mt-20"
                priority
              />
            </div>

            {/* Text Content */}
            <div>
              <p className="text-gray-700 mb-10 leading-relaxed">
                Gain greater control over your business or subsidiary with SAP
                Business One. Streamline key processes, gain greater insight into
                your business, and make decisions based on real-time information.
              </p>

              {/* ===================== FEATURES (SAP STYLE) ===================== */}
              <div className="space-y-6 mb-10">
                {features.map((feature, index) => {
                  const isExpanded = expandedIndex === index;

                  return (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6"
                    >
                      {/* Header */}
                      <button
                        onClick={() => toggleExpand(index)}
                        className="w-full flex justify-between items-start text-left"
                      >
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900">
                            {feature.title}
                          </h3>
                          
                        </div>

                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-2"
                        >
                          <ChevronDown className="w-6 h-6 text-gray-500" />
                        </motion.span>
                      </button>

                      {/* Expanded Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-8 space-y-6">
                              {feature.subFeatures.map((sub, i) => (
                                <div key={i}>
                                  <p className="mt-2 text-gray-600 max-w-xl">
                            {feature.description}
                          </p>
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {sub.title}
                                  </h4>
                                  <p className="mt-1 text-gray-600 leading-relaxed max-w-xl">
                                    {sub.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Button */}
              <a
  href="/pdf/SAP_Business_One.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-8 py-3 rounded-md shadow-md"
>
  SAP Solution Brief
</a>

            </div>
          </div>
        </div>
      </div>

      <section className="bg-gradient-to-b from-white to-gray-50 py-28">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        See how customers are succeeding with SAP Business One
      </h2>
      <p className="mt-4 text-gray-600 text-lg">
        Real businesses. Real results. Powered by SAP Business One.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {[
        {
          img: "/img/coffee.png",
          title: "Sustainable growth potential",
          text:
            "Majas Coffee expanded production and distribution with full traceability and direct e-commerce sales.",
        },
        {
          img: "/img/western.png",
          title: "Working smarter",
          text:
            "Western Spirits improved order accuracy, picking, and shipping while increasing customer satisfaction.",
        },
        {
          img: "/img/kliewe.png",
          title: "Future-proof transformation",
          text:
            "KlieWe modernized operations by connecting employees and offices with unified data.",
        },
        {
          img: "/img/rosa.png",
          title: "5,000+ tons controlled annually",
          text:
            "Vale da Rosa increased productivity by integrating all business functions end-to-end.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-gray-100 text-center"
        >
          <Image
            src={item.img}
            alt={item.title}
            width={140}
            height={70}
            className="mx-auto mb-6 object-contain"
          />

          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* ===================== VIDEO SECTION ===================== */}
<section className="py-24 bg-white">
  <div className="max-w-5xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Watch SAP Business One in Action
      </h2>
      
    </div>

    {/* Video */}
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/QSmlGqkKmWs"
        title="SAP Business One Overview"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
</section>



      <Footer />
    </>
  );
}

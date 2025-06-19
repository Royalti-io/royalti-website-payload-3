"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Calculator, TrendingUp, DollarSign, Users, Clock, BarChart3 } from 'lucide-react'

export const DistributionROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    activeArtists: 1000,
    monthlyVolume: 100000,
    processingStaff: 5,
    paymentDelayDays: 30,
    supportTickets: 500,
    churnRate: 25
  })

  const [results, setResults] = useState({
    staffCostReduction: 0,
    processingTimeSavings: 0,
    supportCostReduction: 0,
    clientRetention: 0,
    premiumServiceFees: 0,
    competitiveAdvantage: 0,
    totalAnnualImpact: 0
  })

  const calculateROI = () => {
    const staffSavings = inputs.processingStaff * 60000 * 0.8 // 80% reduction, $60k avg salary
    const processingDays = 15 // 15 additional business days monthly
    const supportSavings = inputs.supportTickets * 12 * 20 * 0.9 // $20 per ticket, 90% reduction
    const retentionValue = inputs.activeArtists * 960 * (inputs.churnRate * 0.01 * 0.25) // 25% churn reduction
    const apiRevenue = inputs.activeArtists * 0.1 * 180 // 10% want API access at $15/month
    const acquisitionBoost = inputs.activeArtists * 0.4 * 960 // 40% more acquisitions

    const totalImpact = staffSavings + supportSavings + retentionValue + apiRevenue + acquisitionBoost

    setResults({
      staffCostReduction: Math.round(staffSavings),
      processingTimeSavings: processingDays,
      supportCostReduction: Math.round(supportSavings),
      clientRetention: Math.round(retentionValue),
      premiumServiceFees: Math.round(apiRevenue),
      competitiveAdvantage: Math.round(acquisitionBoost),
      totalAnnualImpact: Math.round(totalImpact)
    })
  }

  useEffect(() => {
    calculateROI()
  }, [inputs])

  const handleInputChange = (key: string, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  const inputFields = [
    {
      key: 'activeArtists',
      label: 'Active artists on platform',
      min: 100,
      max: 50000,
      step: 100,
      value: inputs.activeArtists,
      icon: Users
    },
    {
      key: 'monthlyVolume',
      label: 'Monthly transaction volume ($)',
      min: 10000,
      max: 10000000,
      step: 10000,
      value: inputs.monthlyVolume,
      icon: DollarSign
    },
    {
      key: 'processingStaff',
      label: 'Current processing staff count',
      min: 1,
      max: 50,
      step: 1,
      value: inputs.processingStaff,
      icon: Users
    },
    {
      key: 'paymentDelayDays',
      label: 'Average payment delay (days)',
      min: 1,
      max: 90,
      step: 1,
      value: inputs.paymentDelayDays,
      icon: Clock
    },
    {
      key: 'supportTickets',
      label: 'Monthly support ticket volume',
      min: 10,
      max: 5000,
      step: 10,
      value: inputs.supportTickets,
      icon: BarChart3
    },
    {
      key: 'churnRate',
      label: 'Client churn rate (%)',
      min: 5,
      max: 50,
      step: 1,
      value: inputs.churnRate,
      icon: TrendingUp
    }
  ]

  const benefits = [
    {
      title: "Staff Cost Reduction",
      description: "Reduce processing team size",
      value: results.staffCostReduction,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Processing Time Savings",
      description: `${results.processingTimeSavings} additional business days monthly`,
      value: "95% faster",
      icon: Clock,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Support Cost Reduction",
      description: "90% fewer payment-related tickets",
      value: results.supportCostReduction,
      icon: BarChart3,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Client Retention",
      description: "Reduce churn by 25%",
      value: results.clientRetention,
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "Premium Service Fees",
      description: "Offer API access and analytics",
      value: results.premiumServiceFees,
      icon: DollarSign,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Competitive Advantage",
      description: "Faster payments = more artist acquisitions",
      value: results.competitiveAdvantage,
      icon: TrendingUp,
      color: "text-royal-600 dark:text-royal-400",
      bgColor: "bg-royal-50 dark:bg-royal-900/20"
    }
  ]

  return (
    <section className="py-24 bg-muted/30 dark:bg-black/20">
      <Container>
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-foreground">
              Calculate Your Distribution Platform
              <span className="block text-royal-600 dark:text-royal-400">
                ROI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the exact financial impact Royalti.io will have on your distribution business
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-6 h-6 text-royal-600 dark:text-royal-400" />
                <h3 className="text-2xl font-bold text-foreground">
                  Input Your Metrics
                </h3>
              </div>

              <div className="space-y-6">
                {inputFields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <field.icon className="w-4 h-4 text-muted-foreground" />
                      <label className="text-sm font-medium text-foreground">
                        {field.label}
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={field.value}
                        onChange={(e) => handleInputChange(field.key, parseInt(e.target.value))}
                        className="w-full h-2 bg-muted dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{field.min.toLocaleString()}</span>
                        <span className="font-semibold text-royal-600 dark:text-royal-400">
                          {field.value.toLocaleString()}
                        </span>
                        <span>{field.max.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Results Section */}
          <FadeIn delay={0.4}>
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-2xl font-bold text-foreground">
                  Calculated Distribution Benefits
                </h3>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`p-4 ${benefit.bgColor} border border-border dark:border-gray-700 rounded-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            {benefit.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${benefit.color}`}>
                          {typeof benefit.value === 'number' ? `$${benefit.value.toLocaleString()}` : benefit.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 bg-gradient-to-r from-royal-50 to-green-50 dark:from-royal-900/20 dark:to-green-900/20 border-2 border-royal-200 dark:border-royal-700 rounded-xl"
              >
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Total Annual Impact
                  </h4>
                  <div className="text-4xl font-bold text-royal-600 dark:text-royal-400 mb-2">
                    ${results.totalAnnualImpact.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    in cost savings and revenue enhancement
                  </p>
                </div>
              </motion.div>

              {/* ROI Promise */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                  Average distribution company sees 400% ROI within first year
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* CTA Section */}
        <FadeIn delay={1}>
          <div className="mt-16 text-center p-8 bg-royal-50 dark:bg-royal-900/20 rounded-2xl border border-royal-200 dark:border-royal-800">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Achieve These Results?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Schedule a personalized demo to see exactly how Royalti.io will transform your 
              distribution operations and deliver this ROI for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-royal-600 hover:bg-royal-700 dark:bg-royal-500 dark:hover:bg-royal-600 text-white rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Schedule ROI Analysis Call
              </button>
              <button className="px-8 py-4 border border-royal-600 dark:border-royal-400 text-royal-600 dark:text-royal-400 hover:bg-royal-50 dark:hover:bg-royal-900/20 rounded-lg font-medium transition-colors">
                Download ROI Report
              </button>
            </div>
          </div>
        </FadeIn>
      </Container>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(37 99 235);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(37 99 235);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animation/FadeIn'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react'

export const ROICalculator: React.FC = () => {
  const [artists, setArtists] = useState(25)
  const [royaltyVolume, setRoyaltyVolume] = useState(50000)
  const [adminHours, setAdminHours] = useState(40)
  const [paymentTime, setPaymentTime] = useState("2-4 weeks")
  
  const [calculations, setCalculations] = useState({
    timeSavings: 0,
    costSavings: 0, 
    revenueRecovery: 0,
    totalBenefit: 0
  })

  useEffect(() => {
    // Calculate savings based on inputs
    const adminCostPerHour = 60 // $60/hour for admin work
    const savedHours = Math.round(adminHours * 0.92) // 92% time reduction
    const monthlyCostSavings = savedHours * adminCostPerHour
    const annualCostSavings = monthlyCostSavings * 12
    
    // Revenue recovery based on volume (0.5% of monthly volume)
    const monthlyRevenueRecovery = royaltyVolume * 0.005
    const annualRevenueRecovery = monthlyRevenueRecovery * 12
    
    const totalAnnualBenefit = annualCostSavings + annualRevenueRecovery

    setCalculations({
      timeSavings: savedHours,
      costSavings: annualCostSavings,
      revenueRecovery: annualRevenueRecovery, 
      totalBenefit: totalAnnualBenefit
    })
  }, [artists, royaltyVolume, adminHours, paymentTime])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-royal-50/50 to-accent/5 dark:from-royal-900/10 dark:to-accent/5">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-royal-600 dark:bg-royal-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="w-4 h-4" />
              Interactive ROI Calculator
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Calculate Your Label's
              <span className="block text-royal-600 dark:text-royal-400">
                Return on Investment
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how much time and money Royalti.io can save your label operations
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <FadeIn delay={0.2} direction="left">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Your Label Details</h3>
              
              <div className="space-y-6">
                {/* Number of Artists */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Number of active artists: <span className="text-royal-600 dark:text-royal-400 font-bold">{artists}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={artists}
                    onChange={(e) => setArtists(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Monthly Royalty Volume */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Average monthly royalty volume: <span className="text-royal-600 dark:text-royal-400 font-bold">{formatCurrency(royaltyVolume)}</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={royaltyVolume}
                    onChange={(e) => setRoyaltyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$1K</span>
                    <span>$500K</span>
                  </div>
                </div>

                {/* Admin Hours */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Current admin hours per month: <span className="text-royal-600 dark:text-royal-400 font-bold">{adminHours} hours</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="160"
                    value={adminHours}
                    onChange={(e) => setAdminHours(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5h</span>
                    <span>160h</span>
                  </div>
                </div>

                {/* Payment Processing Time */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Current payment processing time:
                  </label>
                  <select
                    value={paymentTime}
                    onChange={(e) => setPaymentTime(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-royal-600 dark:focus:ring-royal-400"
                  >
                    <option value="Same day">Same day</option>
                    <option value="1 week">1 week</option>
                    <option value="2-4 weeks">2-4 weeks</option>
                    <option value="1-2 months">1-2 months</option>
                  </select>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Results Section */}
          <FadeIn delay={0.4} direction="right">
            <div className="bg-gradient-to-br from-royal-600 to-royal-700 dark:from-royal-500 dark:to-royal-600 text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Your Calculated Savings</h3>
              
              <div className="space-y-6">
                {/* Time Savings */}
                <motion.div
                  key={calculations.timeSavings}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6" />
                    <span className="font-semibold">Time Savings</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {calculations.timeSavings} hours/month
                  </div>
                  <div className="text-sm opacity-90">
                    92% reduction in admin time
                  </div>
                </motion.div>

                {/* Cost Savings */}
                <motion.div
                  key={calculations.costSavings}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-6 h-6" />
                    <span className="font-semibold">Annual Cost Savings</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(calculations.costSavings)}
                  </div>
                  <div className="text-sm opacity-90">
                    Reduced administrative overhead
                  </div>
                </motion.div>

                {/* Revenue Recovery */}
                <motion.div
                  key={calculations.revenueRecovery}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6" />
                    <span className="font-semibold">Revenue Recovery</span>
                  </div>
                  <div className="text-3xl font-bold">
                    {formatCurrency(calculations.revenueRecovery)}
                  </div>
                  <div className="text-sm opacity-90">
                    Found missed streaming royalties
                  </div>
                </motion.div>

                {/* Total Benefit */}
                <motion.div
                  key={calculations.totalBenefit}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-accent/20 border border-accent/30 rounded-xl p-4"
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">
                      Total Annual Benefit
                    </div>
                    <div className="text-4xl font-bold">
                      {formatCurrency(calculations.totalBenefit)}
                    </div>
                    <div className="text-sm opacity-90 mt-2">
                      In savings and recovered revenue
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 text-center">
                <Button 
                  variant="secondary"
                  size="lg"
                  className="bg-white text-royal-600 hover:bg-white/90 font-semibold"
                >
                  Start Saving Today - Begin Free Trial
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ROI Promise */}
        <FadeIn delay={0.6}>
          <div className="mt-16 text-center">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold mb-4">
                90-Day ROI Guarantee
              </h4>
              <p className="text-muted-foreground">
                If Royalti.io doesn't save your label money in 90 days, 
                we'll refund your entire investment. That's how confident we are 
                in our platform's value.
              </p>
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
          background: rgb(var(--royal-600));
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: rgb(var(--royal-600));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  )
}
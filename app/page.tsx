"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, ArrowLeft, Camera, ExternalLink, ChevronLeft, Pin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { uploadPhotoToSupabase } from "@/lib/supabaseUploadPhoto"
import { supabase } from "@/lib/supabaseClient"

export default function TelegramSimulation() {
  // State to track which screen to show
  const [currentScreen, setCurrentScreen] = useState<"group" | "bot">("group")

  // Reference to the bot component
  const botRef = useRef<HTMLDivElement>(null)

  // Function to handle clicking the CTA button
  const handleStartConsultation = () => {
    setCurrentScreen("bot")
    // Scroll to the bot component
    setTimeout(() => {
      botRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Telegram Group Screen */}
      <div
        className={cn(
          "flex flex-col h-screen max-w-md w-full mx-auto bg-gray-100 border border-gray-300 transition-all duration-500",
          currentScreen === "bot" ? "opacity-0 h-0 overflow-hidden" : "opacity-100",
        )}
      >
        <TelegramGroupView onStartConsultation={handleStartConsultation} />
      </div>

      {/* Bot Screen */}
      <div
        ref={botRef}
        className={cn(
          "flex flex-col h-screen max-w-md w-full mx-auto bg-gray-100 border border-gray-300 transition-all duration-500",
          currentScreen === "group" ? "opacity-0 h-0 overflow-hidden" : "opacity-100",
        )}
      >
        <TelegramBotView />
      </div>
    </div>
  )
}

// Telegram Group Component
function TelegramGroupView({ onStartConsultation }: { onStartConsultation: () => void }) {
  return (
    <>
      {/* Group Header */}
      <div className="flex items-center p-3 bg-[#5288c1] text-white">
        <ChevronLeft className="w-5 h-5 mr-3" />
        <div className="flex-1">
          <h1 className="font-medium">Luxury Lifestyle | Travel | Aesthetics ✈️</h1>
          <p className="text-xs opacity-80">1,245 members, 89 online</p>
        </div>
        <Avatar className="w-10 h-10 ml-2">
          <img src="/luxury-group-avatar.png" alt="Group" />
        </Avatar>
        <button className="p-1 ml-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Group Description */}
      <div className="p-3 bg-white border-b border-gray-200">
        <p className="text-sm text-gray-700">
          Share and discover the best experiences around the world — travel, aesthetics, wellness, exclusive services.
        </p>
      </div>

      {/* Pinned Message Indicator */}
      <div className="flex items-center justify-between p-2 bg-blue-50 border-b border-gray-200">
        <div className="flex items-center">
          <Pin className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-xs text-blue-600">1 pinned message</span>
        </div>
        <ChevronRight className="w-4 h-4 text-blue-500" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-[#e7ebf0]">
        {/* Pinned Advertisement Message */}
        <div className="mb-4">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-2">
              <img src="/estenove-logo.png" alt="Estenove" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Estenove Hair Clinic</span>
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">Pinned</span>
                <span className="ml-2 text-xs text-gray-500">Yesterday</span>
              </div>
              <div className="mt-1 bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src="/hair-transplant-comparison.png"
                  alt="Before and After Hair Transplant"
                  className="w-full h-auto"
                />
                <div className="p-3">
                  <h3 className="font-bold text-base mb-2">Bring Your Hair Back to Life in Istanbul!</h3>
                  <p className="text-sm mb-3">
                    Thinking about hair transplant?
                    <br />
                    Get your free consultation now.
                    <br />
                    VIP hotel stay, airport pickup, aftercare — all included.
                    <br />
                    Now pay with Telegram Stars or Crypto!
                  </p>
                  <div className="flex justify-center mt-4">
                    <Button onClick={onStartConsultation} className="bg-[#0088cc] hover:bg-[#0077b5] text-white w-full">
                      🔥 Start Free Hair Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Group Messages */}
        <div className="mb-4">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-2">
              <img src="/user-avatar-1.png" alt="User" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Michael Johnson</span>
                <span className="ml-2 text-xs text-gray-500">10:45</span>
              </div>
              <div className="mt-1 p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  Just got back from Dubai. The wellness centers there are amazing! Anyone have recommendations for
                  luxury spas in Istanbul?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-2">
              <img src="/user-avatar-2.png" alt="User" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Sophia Williams</span>
                <span className="ml-2 text-xs text-gray-500">10:52</span>
              </div>
              <div className="mt-1 p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  @Michael I was in Istanbul last month. Try the Ottoman Imperial Spa at the Four Seasons. Absolutely
                  divine experience!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-2">
              <img src="/user-avatar-3.png" alt="User" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Alexander Smith</span>
                <span className="ml-2 text-xs text-gray-500">11:03</span>
              </div>
              <div className="mt-1 p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  Has anyone tried the new aesthetic clinic in Monaco? Heard they have some revolutionary treatments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-start">
            <Avatar className="w-10 h-10 mr-2">
              <img src="/user-avatar-4.png" alt="User" />
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">Emma Davis</span>
                <span className="ml-2 text-xs text-gray-500">11:15</span>
              </div>
              <div className="mt-1 p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">
                  Speaking of Istanbul, I had a hair transplant at Estenove last year. Best decision ever! The results
                  are amazing and the VIP treatment was top-notch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex items-center p-3 bg-white border-t border-gray-300">
        <button className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
            <circle cx="12" cy="13" r="3"></circle>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Message"
          className="flex-1 px-3 py-2 ml-2 mr-2 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="text-[#5288c1]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </>
  )
}

// Telegram Bot Component
function TelegramBotView() {
  // State for the conversation flow
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<string>("start")
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    contact: "",
    previousTransplant: null as boolean | null,
    notes: "",
    photoFile: null as File | null,
    photoUrl: "",
  })
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false)
  const [showPaymentSimulation, setShowPaymentSimulation] = useState<boolean>(false)
  const [clickedButtons, setClickedButtons] = useState<Map<string, Set<string>>>(new Map())
  const [recordId, setRecordId] = useState<string | null>(null)
  const [packageButtonsCount, setPackageButtonsCount] = useState(0)
  const [packageChoiceCount, setPackageChoiceCount] = useState(0)
  const [photoButtonsCount, setPhotoButtonsCount] = useState(0)
  const [continueButtonsCount, setContinueButtonsCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Start the conversation when the component mounts
  useEffect(() => {
    startConversation()
  }, [])

  const startConversation = () => {
    // Simulate the user coming from the ad, so we skip the /start command
    // and go straight to the welcome message

    setTimeout(() => {
      addBotMessage({
        id: "welcome",
        type: "text",
        text: "Welcome to Estenove! We're a trusted hair transplant provider in Istanbul, serving over 10,000 happy patients worldwide with 18-month post-operation support.",
      })

      setTimeout(() => {
        addBotMessage({
          id: "welcome-image",
          type: "image",
          imageUrl: "/istanbul-hair-clinic-modern.png",
          caption: "Estenove Hair Transplant Clinic in Istanbul",
        })

        setTimeout(() => {
          addBotMessage({
            id: "language-selection",
            type: "text",
            text: "Please select your preferred language:",
          })

          setTimeout(() => {
            addBotMessage({
              id: "language-buttons",
              type: "buttons",
              buttons: [
                { id: "russian", text: "Russian 🇷🇺" },
                { id: "english", text: "English 🇬🇧" },
              ],
            })
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }

  const handleLanguageSelection = (language: string) => {
    setSelectedLanguage(language)
    addUserMessage({
      id: `selected-${language}`,
      type: "text",
      text: language === "russian" ? "Russian 🇷🇺" : "English 🇬🇧",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showTrustInfo()
    }, 1000)
  }

  const showTrustInfo = () => {
    addBotMessage({
      id: "trust-info-1",
      type: "text",
      text: "Estenove is a certified and internationally recognized hair transplant clinic with years of experience. We offer:",
    })

    setTimeout(() => {
      addBotMessage({
        id: "trust-info-2",
        type: "list",
        items: [
          "✅ VIP hotel & airport transfers",
          "✅ Advanced treatments: FUE, DHI, PRP, and Stemcell",
          "✅ Multilingual support team",
          "✅ 18 months of comprehensive aftercare",
        ],
      })

      setTimeout(() => {
        addBotMessage({
          id: "testimonial",
          type: "text",
          text: '"I had my hair transplant at Estenove last year, and I\'m extremely satisfied with the results. The team was professional and supportive throughout the entire process." - Alex, 42',
        })

        setTimeout(() => {
          addContinueButtons()
        }, 500)
      }, 500)
    }, 500)
  }

  const addContinueButtons = () => {
    // Eski continue butonlarını disable et
    const oldContinueMsgs = messages.filter(
      (msg) => msg.type === "buttons" && msg.buttons?.some(b => b.id === "yes-continue" || b.id === "no-more-info")
    );
    if (oldContinueMsgs.length > 0) {
      setClickedButtons((prev) => {
        const newMap = new Map(prev);
        oldContinueMsgs.forEach(msg => {
          const currentSet = new Set(newMap.get(msg.id) || []);
          currentSet.add("yes-continue");
          currentSet.add("no-more-info");
          newMap.set(msg.id, currentSet);
        });
        return newMap;
      });
    }
    // Yeni butonları unique id ile ekle
    setContinueButtonsCount((prev) => {
      const newCount = prev + 1;
      addBotMessage({
        id: `continue-buttons-${newCount}`,
        type: "buttons",
        buttons: [
          { id: "yes-continue", text: "✅ Yes" },
          { id: "no-more-info", text: "❌ No, I need more info" },
        ],
      });
      return newCount;
    });
  }

  const handleContinueChoice = (choice: string) => {
    addUserMessage({
      id: `selected-${choice}`,
      type: "text",
      text: choice === "yes-continue" ? "✅ Yes" : "❌ No, I need more info",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      if (choice === "yes-continue") {
        showPhotoOption()
      } else {
        showMoreInfo()
      }
    }, 1000)
  }

  const showMoreInfo = () => {
    addBotMessage({
      id: "more-info-1",
      type: "text",
      text: "Estenove has been a leader in hair transplantation for over 10 years. Our clinic is equipped with the latest technology and staffed by experienced surgeons.",
    })

    setTimeout(() => {
      addBotMessage({
        id: "more-info-2",
        type: "text",
        text: "We've performed over 10,000 successful procedures with a 98% satisfaction rate. Our all-inclusive packages ensure you have everything you need during your stay in Istanbul.",
      })

      setTimeout(() => {
        addBotMessage({
          id: "more-testimonial",
          type: "text",
          text: '"The results exceeded my expectations. The entire experience from airport pickup to the final check-up was seamless and professional." - Maria, 35',
        })

        setTimeout(() => {
          addContinueButtons()
        }, 500)
      }, 500)
    }, 500)
  }

  const showPhotoOption = () => {
    // 1. Son photo-buttons mesajını bul ve disable et
    const lastPhotoButtonsMsg = [...messages].reverse().find(
      (msg) => msg.type === "buttons" && msg.buttons?.some(b => b.id === "upload-photo")
    );
    if (lastPhotoButtonsMsg) {
      setClickedButtons((prev) => {
        const newMap = new Map(prev);
        const currentSet = new Set(newMap.get(lastPhotoButtonsMsg.id) || []);
        currentSet.add("upload-photo");
        currentSet.add("skip-photo");
        newMap.set(lastPhotoButtonsMsg.id, currentSet);
        return newMap;
      });
    }
    addBotMessage({
      id: "photo-option",
      type: "text",
      text: "Would you like to upload a photo of your hair so we can recommend the most suitable treatment package using AI?",
    })

    setTimeout(() => {
      setPhotoButtonsCount((prev) => {
        const newCount = prev + 1;
        addBotMessage({
          id: `photo-buttons-${newCount}`,
          type: "buttons",
          buttons: [
            { id: "upload-photo", text: "📷 Upload photo" },
            { id: "skip-photo", text: "➡️ Skip this step" },
          ],
        });
        return newCount;
      });
    }, 500);
  }

  const handlePhotoOption = (option: string) => {
    addUserMessage({
      id: `selected-${option}`,
      type: "text",
      text: option === "upload-photo" ? "📷 Upload photo" : "➡️ Skip this step",
    })

    if (option === "upload-photo") {
      fileInputRef.current?.click()
    } else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        showPackageSelection()
      }, 1000)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          addUserMessage({
            id: "uploaded-photo",
            type: "image",
            imageUrl: event.target.result as string,
          })

          setPhotoUploaded(true)
          setFormData((prev) => ({ ...prev, photoFile: file }))

          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            if (currentStep === "upload-photo-reg") {
              requestName()
            } else {
              addBotMessage({
                id: "analyzing-photo",
                type: "text",
                text: "Analyzing your photo with AI...",
              })

              setTimeout(() => {
                addBotMessage({
                  id: "ai-recommendation",
                  type: "text",
                  text: "Based on your image, we recommend these packages: FUE Sapphire Hair Transplant and DHI-Choi Pen Hair Transplant. This is a preliminary recommendation — final confirmation happens after medical review.",
                })

                setTimeout(() => {
                  showPackageSelection()
                }, 1000)
              }, 2000)
            }
          }, 1000)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const showPackageSelection = () => {
    // 1. Son package-choice mesajını bul
    const lastPackageChoiceMsg = [...messages].reverse().find(
      (msg) => msg.type === "buttons" && msg.buttons?.some(b => b.id === "select-package")
    );
    if (lastPackageChoiceMsg) {
      setClickedButtons((prev) => {
        const newMap = new Map(prev);
        const currentSet = new Set(newMap.get(lastPackageChoiceMsg.id) || []);
        currentSet.add("select-package");
        currentSet.add("back-to-packages");
        newMap.set(lastPackageChoiceMsg.id, currentSet);
        return newMap;
      });
    }
    setPackageButtonsCount((prev) => {
      const newCount = prev + 1;
      addBotMessage({
        id: `package-buttons-${newCount}`,
        type: "buttons",
        buttons: [
          { id: "fue", text: "FUE Sapphire Hair Transplant" },
          { id: "dhi", text: "DHI-Choi Pen Hair Transplant" },
          { id: "female", text: "Female Hair Transplant" },
          { id: "afro", text: "Afro Hair Transplant" },
          { id: "beard", text: "Beard/Facial Hair Transplant" },
          { id: "stemcell", text: "Stemcell Regenerative Therapy" },
        ],
      });
      return newCount;
    });
    addBotMessage({
      id: `package-selection-${packageButtonsCount + 1}`,
      type: "text",
      text: "Please select one of our available packages:",
    });
  };

  const handlePackageSelection = (packageId: string) => {
    const packageNames: Record<string, string> = {
      fue: "FUE Sapphire Hair Transplant",
      dhi: "DHI-Choi Pen Hair Transplant",
      female: "Female Hair Transplant",
      afro: "Afro Hair Transplant",
      beard: "Beard/Facial Hair Transplant",
      stemcell: "Stemcell Regenerative Therapy",
    }

    setSelectedPackage(packageId)
    addUserMessage({
      id: `selected-${packageId}`,
      type: "text",
      text: packageNames[packageId],
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showPackageDetails(packageId)
    }, 1000)
  }

  const showPackageDetails = (packageId: string) => {
    const packageDetails: Record<string, { description: string; includes: string[]; price: string }> = {
      fue: {
        description:
          "FUE Sapphire is our most popular technique, using micromotor extraction and sapphire blades for natural-looking results with minimal scarring.",
        includes: [
          "VIP hotel stay (2 nights)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $2,000",
      },
      dhi: {
        description:
          "DHI-Choi Pen technique allows for direct implantation without creating channels first, resulting in higher density and less trauma to the scalp.",
        includes: [
          "VIP hotel stay (2 nights)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $2,500",
      },
      female: {
        description:
          "Specialized technique for female pattern hair loss, focusing on increasing density while maintaining a natural hairline.",
        includes: [
          "VIP hotel stay (2 nights)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $2,200",
      },
      afro: {
        description:
          "Specialized technique for Afro-textured hair, requiring specific expertise to handle the unique curl pattern and follicle structure.",
        includes: [
          "VIP hotel stay (2 nights)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $2,300",
      },
      beard: {
        description:
          "Facial hair transplantation to enhance or restore beard, mustache, or sideburns for a fuller, more defined look.",
        includes: [
          "VIP hotel stay (2 nights)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $1,800",
      },
      stemcell: {
        description:
          "Advanced regenerative therapy using stem cells to stimulate hair growth and strengthen existing follicles without surgery.",
        includes: [
          "VIP hotel stay (1 night)",
          "Airport & hotel transfers",
          "Comfort-in anesthesia",
          "Medications & aftercare kit",
          "Multilingual translator",
          "18 months of aftercare support",
        ],
        price: "Starting from $1,500",
      },
    }

    const details = packageDetails[packageId]

    addBotMessage({
      id: `package-image-${packageId}`,
      type: "image",
      imageUrl: `/placeholder.svg?height=200&width=400&query=${packageId} hair transplant procedure result`,
      caption: `${packageDetails[packageId].description}`,
    })

    setTimeout(() => {
      addBotMessage({
        id: `package-includes-${packageId}`,
        type: "text",
        text: "What's included:",
      })

      setTimeout(() => {
        addBotMessage({
          id: `package-list-${packageId}`,
          type: "list",
          items: details.includes,
        })

        setTimeout(() => {
          addBotMessage({
            id: `package-price-${packageId}`,
            type: "text",
            text: `Price: ${details.price}`,
          })

          setTimeout(() => {
            setPackageChoiceCount((prev) => {
              const newCount = prev + 1;
              addBotMessage({
                id: `package-choice-${newCount}`,
                type: "buttons",
                buttons: [
                  { id: "select-package", text: "✅ Select this package" },
                  { id: "back-to-packages", text: "🔙 Back to all packages" },
                ],
              });
              return newCount;
            });
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }

  const handlePackageChoice = (choice: string) => {
    addUserMessage({
      id: `choice-${choice}`,
      type: "text",
      text: choice === "select-package" ? "✅ Select this package" : "🔙 Back to all packages",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      if (choice === "select-package") {
        showPreRegistrationForm()
      } else {
        showPackageSelection()
      }
    }, 1000)
  }

  const handlePhotoUploadReg = () => {
    setCurrentStep("upload-photo-reg")
    addUserMessage({
      id: "selected-upload-photo-reg",
      type: "text",
      text: "📷 Upload photo",
    })
    fileInputRef.current?.click()
  }

  const showPreRegistrationForm = () => {
    addBotMessage({
      id: "pre-registration",
      type: "text",
      text: "Great choice! To proceed with your pre-registration, please provide the following information:",
    })

    if (!photoUploaded) {
      setTimeout(() => {
        addBotMessage({
          id: "request-photo",
          type: "text",
          text: "Please upload a photo of your hair so our medical team can assess your case:",
        })

        setTimeout(() => {
          addBotMessage({
            id: "upload-photo-button",
            type: "buttons",
            buttons: [{ id: "upload-photo-reg", text: "📷 Upload photo" }],
          })
        }, 500)
      }, 500)
    } else {
      setTimeout(() => {
        requestName()
      }, 500)
    }
  }

  const requestName = () => {
    setCurrentStep("name")
    addBotMessage({
      id: "request-name",
      type: "text",
      text: "Please enter your full name:",
    })
  }

  const handleNameSubmit = (name: string) => {
    setFormData({ ...formData, name })

    addUserMessage({
      id: "name-response",
      type: "text",
      text: name,
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      requestDOB()
    }, 1000)
  }

  const requestDOB = () => {
    setCurrentStep("dob")
    addBotMessage({
      id: "request-dob",
      type: "text",
      text: "Please enter your date of birth (DD/MM/YYYY):",
    })
  }

  const handleDOBSubmit = (dob: string) => {
    setFormData({ ...formData, dob })

    addUserMessage({
      id: "dob-response",
      type: "text",
      text: dob,
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      requestContact()
    }, 1000)
  }

  const requestContact = () => {
    setCurrentStep("contact")
    addBotMessage({
      id: "request-contact",
      type: "text",
      text: "Please enter your contact information (phone or Telegram) - optional:",
    })
  }

  const handleContactSubmit = (contact: string) => {
    setFormData({ ...formData, contact })

    addUserMessage({
      id: "contact-response",
      type: "text",
      text: contact || "I prefer not to share contact information",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      requestPreviousTransplant()
    }, 1000)
  }

  const requestPreviousTransplant = () => {
    addBotMessage({
      id: "request-previous",
      type: "text",
      text: "Have you had a previous hair transplant?",
    })

    setTimeout(() => {
      addBotMessage({
        id: "previous-buttons",
        type: "buttons",
        buttons: [
          { id: "previous-yes", text: "Yes" },
          { id: "previous-no", text: "No" },
        ],
      })
    }, 500)
  }

  const handlePreviousTransplant = (answer: string) => {
    setFormData({ ...formData, previousTransplant: answer === "previous-yes" })

    addUserMessage({
      id: `selected-${answer}`,
      type: "text",
      text: answer === "previous-yes" ? "Yes" : "No",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      requestNotes()
    }, 1000)
  }

  const requestNotes = () => {
    setCurrentStep("notes")
    addBotMessage({
      id: "request-notes",
      type: "text",
      text: "Any additional notes or questions? (optional)",
    })
  }

  const handleNotesSubmit = (notes: string) => {
    setFormData({ ...formData, notes })

    addUserMessage({
      id: "notes-response",
      type: "text",
      text: notes || "No additional notes",
    })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showPaymentStep()
    }, 1000)
  }

  const showPaymentStep = () => {
    addBotMessage({
      id: "payment-intro",
      type: "text",
      text: "Great! Your pre-registration is complete. Please choose your preferred payment method to confirm your booking.",
    })

    setTimeout(() => {
      addBotMessage({
        id: "payment-options",
        type: "buttons",
        buttons: [
          { id: "pay-card", text: "💳 Pay with Card" },
          { id: "pay-ton", text: "💎 Pay with TON" },
          { id: "pay-crypto", text: "₿ Cryptocurrency" },
          { id: "pay-balance", text: "💰 Balance" },
          { id: "pay-back", text: "⬅️ Back" },
        ],
      })
    }, 500)
  }

  const handlePaymentOption = async (option: string) => {
    const paymentOptions: Record<string, string> = {
      "pay-card": "💳 Pay with Card",
      "pay-ton": "💎 Pay with TON",
      "pay-crypto": "₿ Cryptocurrency",
      "pay-balance": "💰 Balance",
      "pay-back": "⬅️ Back",
    }

    addUserMessage({
      id: `selected-${option}`,
      type: "text",
      text: paymentOptions[option],
    })

    if (option === "pay-back") {
      // Eski ödeme butonlarını disable et
      setClickedButtons((prev) => {
        const newMap = new Map(prev)
        const paymentButtons = ["pay-card", "pay-ton", "pay-crypto", "pay-balance", "pay-back"]
        // Son eklenen ödeme buton grubunu bul
        const lastPaymentMsgId = Array.from(newMap.keys()).reverse().find((msgId) => msgId && msgId.startsWith("payment-options")) || "payment-options";
        const currentSet = new Set(newMap.get(lastPaymentMsgId) || [])
        paymentButtons.forEach(btn => currentSet.add(btn))
        newMap.set(lastPaymentMsgId, currentSet)
        return newMap
      })
      if (recordId) {
        setLoading(true)
        const { error } = await supabase
          .from('hair_consultations')
          .delete()
          .eq('id', recordId)
          .eq('status', 'not_payed')
        setLoading(false)
        setRecordId(null)
      }
      // Form başa dönerken clickedButtons'ı sıfırla
      setClickedButtons(new Map())
      setCurrentStep("name")
      requestName()
      return
    }

    setLoading(true)
    let photoUrl = formData.photoUrl
    if (formData.photoFile && !formData.photoUrl) {
      try {
        const safeName = normalizeFileName(formData.name.replace(/\s/g, "_"));
        photoUrl = await uploadPhotoToSupabase(formData.photoFile, safeName)
        setFormData((prev) => ({ ...prev, photoUrl }))
      } catch (e) {
        setLoading(false)
        alert("Fotoğraf yüklenemedi: " + (e && typeof e === "object" && "message" in e ? (e as any).message : JSON.stringify(e)))
        return
      }
    }

    const { data, error } = await supabase
      .from('hair_consultations')
      .insert([{
        full_name: formData.name,
        birth: formData.dob,
        contact: formData.contact,
        language: selectedLanguage,
        previous_transplant: formData.previousTransplant,
        notes: formData.notes,
        selected_package: selectedPackage,
        payment_method: option,
        photo_url: photoUrl,
        status: "not_payed"
      }])
      .select('id')
      .single()

    setLoading(false)

    if (error) {
      alert("Kayıt sırasında hata oluştu.")
    } else {
      setRecordId(data.id)
      showPaymentSimulationScreen()
    }
  }

  const showPaymentSimulationScreen = () => {
    setShowPaymentSimulation(true)
    addBotMessage({
      id: "payment-simulation",
      type: "text",
      text: "Your booking has been saved! Now let's process your payment. Please complete the payment simulation below:",
    })

    setTimeout(() => {
      addBotMessage({
        id: "payment-simulation-buttons",
        type: "buttons",
        buttons: [
          { id: "simulate-payment", text: "💳 Complete Payment" },
          { id: "cancel-payment", text: "❌ Cancel Payment" },
        ],
      })
    }, 500)
  }

  const handlePaymentSimulation = async (action: string) => {
    if (action === "cancel-payment") {
      setShowPaymentSimulation(false)
      addUserMessage({
        id: "canceled-payment",
        type: "text",
        text: "❌ Cancel Payment",
      })

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        addBotMessage({
          id: "payment-canceled",
          type: "text",
          text: "Payment has been canceled. Your booking is still saved but not confirmed. You can try again later.",
        })
      }, 1000)
      return
    }

    if (action === "simulate-payment") {
      addUserMessage({
        id: "completed-payment",
        type: "text",
        text: "💳 Complete Payment",
      })

      setLoading(true)
      
      // Simulate payment processing
      setTimeout(async () => {
        if (recordId) {
          const { error } = await supabase
            .from('hair_consultations')
            .update({ status: 'payed' })
            .eq('id', recordId)

          if (error) {
            setLoading(false)
            alert("Ödeme güncellenirken hata oluştu.")
            return
          }
        }

        setPaymentComplete(true)
        setCurrentStep("done")
        setShowPaymentSimulation(false)
        setLoading(false)

        addBotMessage({
          id: "payment-success",
          type: "text",
          text: "🎉 Payment completed successfully! Your booking is now confirmed. We'll contact you soon to arrange your hair transplant procedure.",
        })

        setTimeout(() => {
          addBotMessage({
            id: "next-steps",
            type: "text",
            text: "What happens next:\n• Our medical team will review your case\n• We'll contact you within 24 hours\n• We'll arrange your travel dates\n• You'll receive detailed pre-procedure instructions",
          })
        }, 1000)
      }, 2000)
    }
  }

  // Helper functions to add messages
  const addBotMessage = (message: Omit<Message, "sender">) => {
    setMessages((prev) => [...prev, { ...message, sender: "bot" }])
  }

  const addUserMessage = (message: Omit<Message, "sender">) => {
    setMessages((prev) => [...prev, { ...message, sender: "user" }])
  }

  // Handle user input submission
  const [inputValue, setInputValue] = useState("")

  // Chat input sadece bu adımlarda aktif olacak
  const isInputDisabled =
    paymentComplete ||
    currentStep === "done" ||
    !["name", "dob", "contact", "notes"].includes(currentStep);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Ödeme tamamlandıysa inputu işleme!
    if (paymentComplete || currentStep === "done") {
      setInputValue("")
      return
    }

    // Handle different form steps
    if (currentStep === "name") {
      handleNameSubmit(inputValue)
    } else if (currentStep === "dob") {
      handleDOBSubmit(inputValue)
    } else if (currentStep === "contact") {
      handleContactSubmit(inputValue)
    } else if (currentStep === "notes") {
      handleNotesSubmit(inputValue)
    }

    setInputValue("")
  }

  // Handle button clicks
  const handleButtonClick = async (buttonId: string, messageId?: string) => {
    const currentMessageId = messageId || ""
    
    // Özel durum: continue grubu
    if (buttonId === "no-more-info") {
      setClickedButtons((prev) => {
        const newMap = new Map(prev)
        const currentSet = new Set(newMap.get(currentMessageId) || [])
        currentSet.add(buttonId)
        newMap.set(currentMessageId, currentSet)
        return newMap
      })
    } else if (buttonId === "yes-continue") {
      setClickedButtons((prev) => {
        const newMap = new Map(prev)
        const currentSet = new Set(newMap.get(currentMessageId) || [])
        currentSet.add(buttonId)
        currentSet.add("no-more-info")
        newMap.set(currentMessageId, currentSet)
        return newMap
      })
    } else if (messageId?.startsWith("package-choice") && (buttonId === "select-package" || buttonId === "back-to-packages")) {
      if (buttonId === "select-package") {
        setClickedButtons((prev) => {
          const newMap = new Map(prev)
          const currentSet = new Set(newMap.get(messageId) || [])
          currentSet.add("select-package")
          currentSet.add("back-to-packages")
          newMap.set(messageId, currentSet)
          return newMap
        })
        handlePackageChoice(buttonId)
      } else if (buttonId === "back-to-packages") {
        showPackageSelection()
        return
      }
    } else if (messageId === "payment-simulation-buttons" && (buttonId === "simulate-payment" || buttonId === "cancel-payment")) {
      setClickedButtons((prev) => {
        const newMap = new Map(prev)
        const currentSet = new Set(newMap.get(messageId) || [])
        currentSet.add("simulate-payment")
        currentSet.add("cancel-payment")
        newMap.set(messageId, currentSet)
        return newMap
      })
    } else {
      // Aynı gruptaki tüm butonları disable et
      const buttonGroups = {
        language: ["russian", "english"],
        continue: ["yes-continue", "no-more-info"],
        photo: ["upload-photo", "skip-photo"],
        packages: ["fue", "dhi", "female", "afro", "beard", "stemcell"],
        packageChoice: ["select-package", "back-to-packages"],
        previous: ["previous-yes", "previous-no"],
        payment: ["pay-card", "pay-ton", "pay-crypto", "pay-balance"],
        paymentSimulation: ["simulate-payment", "cancel-payment"],
        support: ["join-whatsapp", "talk-consultant"]
      }
      // Hangi gruba ait olduğunu bul ve tüm grubu disable et
      for (const [groupName, buttons] of Object.entries(buttonGroups)) {
        if (buttons.includes(buttonId)) {
          setClickedButtons((prev) => {
            const newMap = new Map(prev)
            const currentSet = new Set(newMap.get(currentMessageId) || [])
            buttons.forEach(btn => currentSet.add(btn))
            newMap.set(currentMessageId, currentSet)
            return newMap
          })
          break
        }
      }
      // Eğer grup bulunamadıysa, sadece o butonu disable et
      if (!Object.values(buttonGroups).flat().includes(buttonId)) {
        setClickedButtons((prev) => {
          const newMap = new Map(prev)
          const currentSet = new Set(newMap.get(currentMessageId) || [])
          currentSet.add(buttonId)
          newMap.set(currentMessageId, currentSet)
          return newMap
        })
      }
    }
    
    if (buttonId === "russian" || buttonId === "english") {
      handleLanguageSelection(buttonId)
    } else if (buttonId === "yes-continue" || buttonId === "no-more-info") {
      handleContinueChoice(buttonId)
    } else if (buttonId === "upload-photo" || buttonId === "skip-photo") {
      handlePhotoOption(buttonId)
    } else if (buttonId === "upload-photo-reg") {
      handlePhotoUploadReg()
    } else if (["fue", "dhi", "female", "afro", "beard", "stemcell"].includes(buttonId)) {
      handlePackageSelection(buttonId)
    } else if (buttonId === "previous-yes" || buttonId === "previous-no") {
      handlePreviousTransplant(buttonId)
    } else if (["pay-card", "pay-ton", "pay-crypto", "pay-balance", "pay-back"].includes(buttonId)) {
      handlePaymentOption(buttonId)
    } else if (["simulate-payment", "cancel-payment"].includes(buttonId)) {
      handlePaymentSimulation(buttonId)
    } else if (buttonId === "visit-website") {
      window.open("https://www.estenove.com/en/", "_blank")
    } else if (buttonId === "learn-packages") {
      showPackageSelection()
    } else if (buttonId === "hotel-info") {
      addBotMessage({
        id: "hotel-info",
        type: "text",
        text: "We partner with luxury 4-5 star hotels in Istanbul. Your package includes 2 nights accommodation with breakfast, airport pickup and drop-off, and transportation to/from the clinic.",
      })
    } else if (buttonId === "contact-support") {
      addBotMessage({
        id: "contact-support",
        type: "text",
        text: "You can reach our support team 24/7 via WhatsApp at +90 555 123 4567 or email at support@estenove.com",
      })
    } else if (buttonId === "faqs") {
      addBotMessage({
        id: "faqs",
        type: "text",
        text: "Here are some frequently asked questions about hair transplantation at Estenove:",
      })
      setTimeout(() => {
        addBotMessage({
          id: "faqs-list",
          type: "list",
          items: [
            "How long does the procedure take? Usually 6-8 hours for a single session.",
            "Is it painful? No, the procedure is performed under local anesthesia.",
            "When will I see results? Initial growth begins around 3-4 months, with full results at 12-18 months.",
            "How long is the recovery? Most patients return to normal activities after 3-5 days.",
          ],
        })
      }, 500)
    } else if (buttonId === "back-to-packages") {
      const packageButtons = ["fue", "dhi", "female", "afro", "beard", "stemcell"];
      setClickedButtons((prev) => {
        const newMap = new Map(prev)
        const currentSet = new Set(newMap.get(currentMessageId) || [])
        packageButtons.forEach(btn => currentSet.delete(btn))
        newMap.set(currentMessageId, currentSet)
        return newMap
      })
    }
  }

  return (
    <>
      {/* Telegram header */}
      <div className="flex items-center p-3 bg-[#5288c1] text-white">
        <ArrowLeft className="w-5 h-5 mr-3" />
        <div className="flex items-center">
          <Avatar className="w-8 h-8 mr-2">
            <img src="/estenove-logo.png" alt="Estenove" />
          </Avatar>
          <div>
            <h1 className="font-medium">Estenove Hair Transplant</h1>
            <p className="text-xs opacity-80">Online</p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-[#e7ebf0]">
        {messages.map((message) => (
          <div key={message.id} className={cn("mb-3", message.sender === "user" ? "flex justify-end" : "")}>
            {message.type === "command" && (
              <div className="inline-block px-3 py-1 text-sm text-gray-500 bg-gray-200 rounded-full">
                {message.text}
              </div>
            )}

            {message.type === "text" && message.sender === "bot" && (
              <div className="max-w-[80%] p-3 bg-white rounded-lg shadow-sm">
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {message.type === "text" && message.sender === "user" && (
              <div className="max-w-[80%] p-3 bg-[#effdde] rounded-lg shadow-sm">
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            {message.type === "image" && (
              <div
                className={cn(
                  "max-w-[80%] rounded-lg overflow-hidden shadow-sm",
                  message.sender === "bot" ? "bg-white" : "bg-[#effdde]",
                )}
              >
                <img
                  src={message.imageUrl || "/placeholder.svg"}
                  alt={message.caption || "Image"}
                  className="w-full h-auto rounded-t-lg"
                />
                {message.caption && <p className="p-3 text-sm">{message.caption}</p>}
              </div>
            )}

            {message.type === "link" && (
              <div className="max-w-[80%] p-3 bg-white rounded-lg shadow-sm">
                <a
                  href={message.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-600 hover:underline"
                >
                  {message.text} <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}

            {message.type === "list" && (
              <div className="max-w-[80%] p-3 bg-white rounded-lg shadow-sm">
                <ul className="pl-0 text-sm list-none">
                  {message.items?.map((item, i) => (
                    <li key={i} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {message.type === "buttons" && (
              <div className="max-w-[80%]">
                <div className="flex flex-wrap gap-2">
                  {message.buttons?.map((button) => (
                    <Button
                      key={button.id}
                      variant="outline"
                      disabled={
                        clickedButtons.get(message.id)?.has(button.id) ||
                        (button.id === "pay-back" && Boolean(recordId) && paymentComplete)
                      }
                      className="bg-white hover:bg-gray-100 text-black border-gray-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleButtonClick(button.id, message.id)}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center mb-3">
            <div className="w-12 h-6 p-1 bg-gray-200 rounded-full">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleInputSubmit} className="flex items-center p-3 bg-white border-t border-gray-300">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-gray-500"
          onClick={() => fileInputRef.current?.click()}
          disabled={isInputDisabled}
        >
          <Camera className="w-5 h-5" />
        </Button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Message"
          className="flex-1 px-3 py-2 ml-2 mr-2 text-sm bg-gray-100 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isInputDisabled}
        />
        <Button type="submit" variant="ghost" size="icon" className="text-[#5288c1]" disabled={isInputDisabled || !inputValue.trim()}>
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </>
  )
}

// Types
interface Message {
  id: string
  type: "text" | "image" | "buttons" | "command" | "link" | "list"
  text?: string
  imageUrl?: string
  caption?: string
  buttons?: { id: string; text: string }[]
  items?: string[]
  url?: string
  sender: "bot" | "user"
}

// Türkçe ve özel karakterleri normalize eden fonksiyon
function normalizeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/[^a-zA-Z0-9-_.]/g, "_")
    .toLowerCase();
}

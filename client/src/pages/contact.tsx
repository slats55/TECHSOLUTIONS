import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent Successfully!",
        description: data.message || "Thank you for your message! We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact/submissions"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error Sending Message",
        description: error.message || "Failed to send your message. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <main className="pt-8">
      {/* Contact Header */}
      <section className="py-20 bg-secondary" data-testid="contact-header">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6" data-testid="contact-title">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="contact-subtitle">
            Ready to get started? Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-background" data-testid="contact-form-section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card p-8 rounded-xl border border-border" data-testid="contact-form-card">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6" data-testid="contact-form-title">
                  Send Message
                </h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="form-label-name">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="bg-input border-border"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage data-testid="form-error-name" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="form-label-email">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              type="email"
                              {...field} 
                              className="bg-input border-border"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage data-testid="form-error-email" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="form-label-service">Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-input border-border" data-testid="select-service">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="computer-repair" data-testid="service-option-repair">
                                Computer Repair
                              </SelectItem>
                              <SelectItem value="website-design" data-testid="service-option-design">
                                Website Design
                              </SelectItem>
                              <SelectItem value="consultation" data-testid="service-option-consultation">
                                Consultation
                              </SelectItem>
                              <SelectItem value="data-recovery" data-testid="service-option-data">
                                Data Recovery
                              </SelectItem>
                              <SelectItem value="other" data-testid="service-option-other">
                                Other
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage data-testid="form-error-service" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel data-testid="form-label-message">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or repair needs..." 
                              rows={5}
                              {...field} 
                              className="bg-input border-border resize-none"
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage data-testid="form-error-message" />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-accent text-accent-foreground py-4 text-lg font-bold hover:bg-accent/90"
                      disabled={isSubmitting}
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div data-testid="contact-info">
              <h3 className="text-2xl font-bold mb-8" data-testid="contact-info-title">
                Get In Touch
              </h3>
              <div className="space-y-6">
                <div className="flex items-start" data-testid="contact-location">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2" data-testid="contact-location-title">
                      Visit Our Location
                    </h4>
                    <p className="text-muted-foreground" data-testid="contact-location-address">
                      123 Tech Street<br />Downtown City, ST 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2" data-testid="contact-phone-title">
                      Call Us
                    </h4>
                    <p className="text-muted-foreground" data-testid="contact-phone-number">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start" data-testid="contact-email">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2" data-testid="contact-email-title">
                      Email Us
                    </h4>
                    <p className="text-muted-foreground" data-testid="contact-email-address">
                      info@mtvindustries.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12" data-testid="business-hours">
                <h4 className="font-semibold text-lg mb-4" data-testid="business-hours-title">
                  Business Hours
                </h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between" data-testid="hours-weekdays">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-saturday">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between" data-testid="hours-sunday">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary" data-testid="contact-faq-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="faq-subtitle">
              Quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How quickly can you repair my computer?",
                answer: "Most repairs are completed within 24-48 hours. Complex issues may take longer, but we'll provide a realistic timeline upfront.",
                testId: "faq-repair-time"
              },
              {
                question: "Do you provide warranties on repairs?",
                answer: "Yes, we provide a 90-day warranty on all hardware repairs and 30 days on software services.",
                testId: "faq-warranty"
              },
              {
                question: "Can you recover data from a crashed hard drive?",
                answer: "We offer professional data recovery services. Success depends on the type and extent of damage, but we have a high success rate.",
                testId: "faq-data-recovery"
              },
              {
                question: "How much does a website cost?",
                answer: "Website costs vary based on complexity and features. Basic sites start at $599, with custom projects quoted individually.",
                testId: "faq-website-cost"
              },
              {
                question: "Do you offer ongoing website maintenance?",
                answer: "Yes, we provide monthly maintenance plans that include updates, backups, security monitoring, and technical support.",
                testId: "faq-maintenance"
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash, check, all major credit cards, and can arrange payment plans for larger projects.",
                testId: "faq-payment"
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border" data-testid={faq.testId}>
                <h3 className="font-bold text-lg mb-3" data-testid={`${faq.testId}-question`}>
                  {faq.question}
                </h3>
                <p className="text-muted-foreground" data-testid={`${faq.testId}-answer`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

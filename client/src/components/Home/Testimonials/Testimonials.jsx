import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Marketing Director",
      content:
        "Klyora has completely transformed my shopping experience. The quality is unmatched and the customer service is exceptional.",
      avatar:
        "https://images.pexels.com/photos/3760044/pexels-photo-3760044.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      content:
        "Fast shipping, excellent customer support, and products that actually exceed expectations. Highly recommended!",
      avatar:
        "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Designer",
      content:
        "Love the attention to detail and the sustainable packaging. The curation is perfect for my lifestyle.",
      avatar:
        "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 5,
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="py-20 bg-soft-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-midnight-blue mb-4">
            What Our Customers Say
          </h2>
          <p className="text-midnight-blue/70 text-lg">
            Real experiences from our valued community
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-lavender-tint to-cool-gray/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-yellow-400 fill-current"
                />
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-midnight-blue mb-8 font-medium italic leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full border-3 border-soft-white shadow-lg"
              />
              <div className="text-left">
                <div className="font-semibold text-midnight-blue text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-silver-mist">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={() =>
              setCurrentTestimonial((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-soft-white border border-cool-gray p-4 rounded-full hover:bg-lavender-tint hover:border-royal-indigo transition-all duration-300 shadow-lg"
          >
            <ChevronLeft size={24} className="text-midnight-blue" />
          </button>

          <button
            onClick={() =>
              setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-soft-white border border-cool-gray p-4 rounded-full hover:bg-lavender-tint hover:border-royal-indigo transition-all duration-300 shadow-lg"
          >
            <ChevronRight size={24} className="text-midnight-blue" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-midnight-blue w-8"
                    : "bg-cool-gray hover:bg-silver-mist"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import {
  Award,
  Users,
  Clock,
  Package,
} from "lucide-react";

const Stats = () => {
    const stats = [
      { number: "50K+", label: "Happy Customers", icon: Users },
      { number: "500+", label: "Premium Products", icon: Package },
      { number: "99.9%", label: "Satisfaction Rate", icon: Award },
      { number: "24/7", label: "Customer Support", icon: Clock },
    ];
  return (
    <section className="py-16 bg-midnight-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-royal-indigo/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-royal-indigo group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-8 h-8 mx-auto text-soft-white" />
                </div>
                <div className="text-3xl font-bold text-soft-white mb-2">
                  {stat.number}
                </div>
                <div className="text-silver-mist">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Stats

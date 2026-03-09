import RegistrationForm from "@/components/registration/registration-form";

export default function RegisterPage() {
  return (
    <section className="bg-dark-red text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with Red Line */}
        <div className="flex gap-4 mb-12 md:mb-16">
          <div className="w-1 bg-red-primary flex-shrink-0" />
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">REGISTRATION</h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              ESTABLISH CONNECTION FOR COMPETITIONS,
              <br />
              SPONSORSHIPS AND STRATEGIC ALLIANCES.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </section>
  );
}

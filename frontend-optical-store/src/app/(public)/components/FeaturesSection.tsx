import FeatureItem from "./FeatureItem";

export default function FeaturesSection() {
  const features = [
    {
      icon: (
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M9 20v-2a3 3 0 013-3h0a3 3 0 013 3v2M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
      label: "Priorizamos as Pessoas",
    },
    {
      icon: (
        <path d="M14 10h4.764a1 1 0 01.832 1.555l-5.528 8.06a1 1 0 01-1.696 0l-5.528-8.06A1 1 0 017.236 10H12" />
      ),
      label: "Qualidade de Vida",
    },
    {
      icon: (
        <>
          <path d="M12 2l8 4v6c0 5.25-3.15 10.74-8 12-4.85-1.26-8-6.75-8-12V6l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </>
      ),
      label: "Produtos de Qualidade",
    },
    {
      icon: (
        <>
          <path d="M12 2a7 7 0 00-7 7c0 4.5 7 11 7 11s7-6.5 7-11a7 7 0 00-7-7z" />
          <path d="M12 8v.01" />
          <path d="M12 10h.01" />
        </>
      ),
      label: "Profissionais Especialistas",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 py-10 bg-white">
      {features.map((feature, idx) => (
        <FeatureItem key={idx} icon={feature.icon} label={feature.label} />
      ))}
    </div>
  );
}


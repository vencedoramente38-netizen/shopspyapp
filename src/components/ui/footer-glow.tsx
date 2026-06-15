import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Zap,
} from 'lucide-react';

interface FooterGlowProps {
  onEnterLogin: () => void;
}

const data = {
  facebookLink: '#',
  instaLink: '#',
  twitterLink: '#',
  youtubeLink: '#',
  company: {
    name: 'ShopSpy',
    description:
      'A ferramenta definitiva para afiliados de elite da Shopee. Encontre produtos virais, gere copies persuasivas instantaneamente e impulsione suas conversões sem complicação.',
    logo: 'https://i.postimg.cc/yxg1xsb5/edd68b75-b6bf-4dcd-af88-7dd1332566ed.png',
  },
};

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: data.facebookLink },
  { icon: Instagram, label: 'Instagram', href: data.instaLink },
  { icon: Twitter, label: 'Twitter', href: data.twitterLink },
  { icon: Youtube, label: 'YouTube', href: data.youtubeLink },
];

const navigationLinks = [
  { text: 'Como funciona', href: '#como-funciona' },
  { text: 'Recursos', href: '#recursos' },
  { text: 'Preços', href: '#precos' },
  { text: 'FAQ', href: '#faq' },
];

const resourceLinks = [
  { text: 'Produtos Virais', href: '#recursos' },
  { text: 'Score de Viralidade', href: '#recursos' },
  { text: 'Gerador de Copy', href: '#recursos' },
  { text: 'Projetos Favoritos', href: '#recursos' },
];

const helpfulLinks = [
  { text: 'Suporte', href: '#faq' },
  { text: 'Live Chat', href: '#faq', hasIndicator: true },
  { text: 'Termos de Uso', href: '#' },
  { text: 'Privacidade', href: '#' },
];

const contactInfo = [
  { icon: Mail, text: 'suporte@shopspy.com.br' },
  { icon: Phone, text: '+55 (11) 99999-9999' },
  { icon: MapPin, text: 'São Paulo, SP, Brasil', isAddress: true },
];

export default function FooterGlow({ onEnterLogin }: FooterGlowProps) {
  return (
    <footer className="relative w-full overflow-hidden pt-24 pb-12 bg-white font-sans border-t border-neutral-100">
      {/* Background neon ambient globs */}
      <div className="pointer-events-none absolute top-10 left-1/2 z-0 h-96 w-[120%] -translate-x-1/2 select-none">
        <div className="absolute -top-12 left-1/4 h-80 w-80 rounded-full bg-[#D0011B]/5 blur-[100px] sm:bg-[#D0011B]/8"></div>
        <div className="absolute right-1/4 -bottom-16 h-96 w-96 rounded-full bg-[#D0011B]/5 blur-[120px] sm:bg-[#D0011B]/8"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Glassmorphic nested card list container */}
        <div className="mx-auto border border-[#D0011B]/10 rounded-3xl p-8 sm:p-12 bg-white/40 backdrop-blur-md shadow-[0_12px_44px_rgba(208,1,27,0.03)] hover:border-[#D0011B]/20 transition-all duration-300">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <img
                  src={data.company.logo}
                  alt="ShopSpy Logo"
                  className="h-10 w-auto opacity-95 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="text-2xl font-black tracking-tight text-neutral-900">
                  {data.company.name}
                </span>
              </div>

              <p className="text-neutral-500 mt-6 max-w-md text-center leading-relaxed text-sm font-semibold sm:max-w-xs sm:text-left">
                {data.company.description}
              </p>

              <ul className="mt-8 flex justify-center gap-5 sm:justify-start">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-neutral-400 hover:text-[#D0011B] transition p-2 hover:bg-[#D0011B]/5 rounded-full block"
                      aria-label={label}
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-sm font-black tracking-wider uppercase text-[#D0011B]">Navegação</p>
                <ul className="mt-6 space-y-4 text-[14px]">
                  {navigationLinks.map(({ text, href }) => (
                    <li key={text}>
                      <a
                        className="text-neutral-500 hover:text-neutral-900 font-semibold transition"
                        href={href}
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm font-black tracking-wider uppercase text-[#D0011B]">Recursos</p>
                <ul className="mt-6 space-y-4 text-[14px]">
                  {resourceLinks.map(({ text, href }) => (
                    <li key={text}>
                      <a
                        className="text-neutral-500 hover:text-neutral-900 font-semibold transition"
                        href={href}
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                <p className="text-sm font-black tracking-wider uppercase text-[#D0011B]">Ajuda</p>
                <ul className="mt-6 space-y-4 text-[14px]">
                  {helpfulLinks.map(({ text, href, hasIndicator }) => (
                    <li key={text}>
                      <a
                        href={href}
                        className={`${
                          hasIndicator
                            ? 'inline-flex items-center justify-center gap-2 sm:justify-start group'
                            : 'text-neutral-500 hover:text-neutral-900 font-semibold transition'
                        }`}
                      >
                        <span className="text-neutral-500 hover:text-neutral-900 font-semibold transition">
                          {text}
                        </span>
                        {hasIndicator && (
                          <span className="relative flex size-2">
                            <span className="bg-[#D0011B] absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                            <span className="bg-[#D0011B] relative inline-flex size-2 rounded-full" />
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-center md:text-left">
              {contactInfo.map(({ icon: Icon, text, isAddress }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-neutral-500 font-semibold">
                  <Icon className="text-[#D0011B] size-4 shrink-0" />
                  {isAddress ? (
                    <address className="not-italic">{text}</address>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center text-xs font-semibold text-neutral-400">
              © 2026 {data.company.name}. Todos os direitos reservados. Sem afiliação oficial com a Shopee.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

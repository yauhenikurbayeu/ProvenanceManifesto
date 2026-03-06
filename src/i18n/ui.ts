export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  ru: 'Русский',
  de: 'Deutsch'
};

export const defaultLang = 'en';

export const routeMap = {
  en: {
    manifesto: '',
    principles: 'principles',
    about: 'about',
    sign: 'sign'
  },
  es: {
    manifesto: '',
    principles: 'principios',
    about: 'acerca-de',
    sign: 'firmar'
  },
  fr: {
    manifesto: '',
    principles: 'principes',
    about: 'a-propos',
    sign: 'signer'
  },
  ru: {
    manifesto: '',
    principles: 'principles',
    about: 'about',
    sign: 'sign'
  },
  de: {
    manifesto: '',
    principles: 'prinzipien',
    about: 'ueber',
    sign: 'unterschreiben'
  }
} as const;

export const ui = {
  en: {
    'nav.manifesto': 'Manifesto',
    'nav.principles': 'Principles',
    'nav.about': 'About',
    'nav.sign': 'Sign Manifesto',
    'hero.read': 'Read the full text',
    'hero.over': 'over',
    'signatures.title': 'Join the Movement',
    'signatures.count': 'people have already signed the manifesto',
    'footer.github': 'Github',
    'footer.twitter': 'Twitter',
    'footer.community': 'Community',
    'footer.privacy': 'Privacy',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    'nav.manifesto': 'Manifiesto',
    'nav.principles': 'Principios',
    'nav.about': 'Acerca de',
    'nav.sign': 'Firmar Manifiesto',
    'hero.read': 'Leer el texto completo',
    'hero.over': 'más que',
    'signatures.title': 'Únete al Movimiento',
    'signatures.count': 'personas ya han firmado el manifiesto',
    'footer.github': 'Github',
    'footer.twitter': 'Twitter',
    'footer.community': 'Comunidad',
    'footer.privacy': 'Privacidad',
    'footer.rights': 'Todos los derechos reservados.',
  },
  fr: {
    'nav.manifesto': 'Manifeste',
    'nav.principles': 'Principes',
    'nav.about': 'À propos',
    'nav.sign': 'Signer le Manifeste',
    'hero.read': 'Lire le texte intégral',
    'hero.over': 'plutôt que',
    'signatures.title': 'Rejoignez le Mouvement',
    'signatures.count': 'personnes ont déjà signé le manifeste',
    'footer.github': 'Github',
    'footer.twitter': 'Twitter',
    'footer.community': 'Communauté',
    'footer.privacy': 'Confidentialité',
    'footer.rights': 'Tous droits réservés.',
  },
  ru: {
    'nav.manifesto': 'Манифест',
    'nav.principles': 'Принципы',
    'nav.about': 'О нас',
    'nav.sign': 'Подписать Манифест',
    'hero.read': 'Читать полный текст',
    'hero.over': 'вместо',
    'signatures.title': 'Присоединяйтесь к движению',
    'signatures.count': 'человек уже подписали манифест',
    'footer.github': 'Github',
    'footer.twitter': 'Twitter',
    'footer.community': 'Сообщество',
    'footer.privacy': 'Конфиденциальность',
    'footer.rights': 'Все права защищены.',
  },
  de: {
    'nav.manifesto': 'Manifest',
    'nav.principles': 'Prinzipien',
    'nav.about': 'Über',
    'nav.sign': 'Manifest unterschreiben',
    'hero.read': 'Vollständigen Text lesen',
    'hero.over': 'mehr als',
    'signatures.title': 'Schließ dich der Bewegung an',
    'signatures.count': 'Menschen haben das Manifest bereits unterzeichnet',
    'footer.github': 'Github',
    'footer.twitter': 'Twitter',
    'footer.community': 'Gemeinschaft',
    'footer.privacy': 'Datenschutz',
    'footer.rights': 'Alle Rechte vorbehalten.',
  }
} as const;

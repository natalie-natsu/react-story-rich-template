import ButtonElement from 'components/Element/Button';

const Intro = ['Intro', [
  `Aussi grande soit-elle, chaque civilisation est vouée à disparaître
  et les ruines laissées par nos ancêtres cohabitent avec les monuments de notre ère.
  Mais dans ce vieux monde abîmé par le poids de la guerre fleuri l'audace des Hommes.
  Ils forgent le progrès, et laissent une marque parmi leurs pairs.`,

  `Cette aura qui vous entoure me parle,
  elle me montre le destin qui vous accompagne, vous et votre audace.
  Que dis-je ? Les destins ! Du plus court au plus long et du plus sombre au plus sacré...`,

  `Saurez-vous saisir les opportunités tout en préservant votre nature ?
  Parviendrez-vous à protéger les personnes qui vous sont chères ?
  Assumerez-vous les choix que vous allez faire ?`,

  `Faites-le sagement, naturellement, égoîstement ou peu importe,
   car rien n'est aussi simple qu'il n'en ait l'air
   et les conséquences de vos actions vous mèneront sur bien des chemins.`,

  {
    component: ButtonElement,
    children: 'My super project',
    fontFamily: 'Rebucked',
    fontSize: 'xl',
    color: 'primary',
    onTap: ({ goForward }) => goForward(),
  },

  `Ici débute donc votre histoire.`,

  `Je vous le confirme, ce vieux temple est votre prison depuis une éternité.
  Vous le savez au fond d'une jungle, dense et magique.`,

  `Il est votre tombeau même ! Celui de votre ancienne vie, que vous avez volontairement oublié.
  Mais les traces demeures toujours. Ce sont les première qui se font sentir parmi tout ce qui vous est inné.`,

  `Vous entendez le craquement de la pierre qui se dérobe devant vous.
  Une lumière vient alors intensément vous éblouir et vous sortir définitivement de ce long sommeil.
  Vous la sentez aussi sur votre coprs, nu, comme si vous n'aviez jamais goûté à la vie.`,

  `Mais c'est l'air qui vous agresse le plus. Il vous fouette,
  comme s'il se vangeait de ne jamais avoir pu vouus toucher durant toutes ces années !
  Ou ces millénaires, qui sait ?`,

  `Vous n'avez aucune notion du temps, vos repères sont inexistants, tout est sombre ou néant.
  Vous êtes étrangère à ce que vous vivez, mais vous le savez dangereux et cela vous rend nerveuse.`,

  {
    children: `Il est temps d'agir, avant que la panique ne s'installe et vous fasse perdre vos moyens.
    Hélas, démunié, vous n'avez guère de plans. Que voulez-vous faire ?`,
    hint: `Mettre en garde ce qui est venu vous chercher est sans doute la meilleure option,
    mais vous pourriez aussi essayer de puisez dans votre instinct primaire pour des résultats plus divers.`,
    actions: [
      { children: `Mettre en garde` },
      { children: `Puiser dans l'instinct` },
    ],
  },
]];

export default Intro;

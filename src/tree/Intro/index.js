import React from 'react';
import ProjectName from '../../components/ProjectName';

const Intro = ['Intro', [
  `Aussi grande soit-elle, chaque civilisation est vouée à disparaître
  et les ruines laissées par nos ancêtres cohabitent avec les monuments de notre ère.
  Mais dans ce vieux monde abîmé par le poids de la guerre fleuri l'audace des Hommes.
  Ils forgent le progrès, et laissent une marque parmi leurs pairs.`,

  `Cette aura qui vous entoure me parle,
  elle me montre le destin qui vous accompagne, vous et votre audace.
  Que dis-je ? Les destins ! Du plus court au plus long et du plus sombre au plus sacré...`,

  `Saurez-vous saisir les opportunités tout en préservant votre nature ?`,

  `Parviendrez-vous à protéger les personnes qui vous sont chères ?`,

  `Assumerez-vous les choix que vous allez faire ?`,

  `Faites-le sagement, naturellement, égoîstement ou peu importe,
   car rien n'est aussi simple qu'il n'en ait l'air
   et les conséquences de vos actions vous mèneront sur bien des chemins.`,

  {
    children: (
      <ProjectName
        component="h1"
        variant="h3"
        color="textPrimary"
        align="center"
        gutterBottom
      />
    ),
    onTap: ({ goForward }) => goForward(),
  },

  `Ici débute donc votre histoire.`,

  `Ce vieux temple est votre prison depuis une éternité.
  Vous le savez au fond d'une jungle, dense et magique.`,

  `Vous le savez votre tombeau, celui de votre ancienne vie, que vous avez volontairement oublié.
  Mais les traces demeures toujours. Ce sont les première à vous faire sentir parmi les sens qui vous sont innés.`,

  `Puis vous entendez le craquement de la pierre qui se dérobe devant vous.
  Une lumière vient intensément vous éblouir et vous sortir définitivement de ce long sommeil.
  Vous la sentez aussi sur votre coprs, nu, comme si vous n'aviez jamais goûté à la vie.`,

  `En dernier, c'est l'air qui s'occupe de vous. Il vous fouette,
  comme s'il se vangeait de ne jamais avoir pu vouus toucher durant toutes ces années, ou ces millénaires même !`,

  `Vous n'avez aucune notion du temps, vos repères sont inexistants, tout est sombre ou néant.
  Vous êtes étrangère à ce que vous vivez, mais vous le savez dangereux et cela vous rend nerveuse.`,

  {
    children: `La panique s'intalle progressivement, comme pour un enfant qui vient de naître, que vous arrive-t-il ?
    Vous pouriez vous levez pour ne plus être aveuglée par cette lumière qui tombe sur votre nez.
    Vous pouvez aussi de mettre en garde ou d'avertir ce qui manifestant est venu pour vous.
    Dernière possibilité est de puisez d'en votre instinct primaire pour vous protéger.`,
    text: true,
    actions: [
      { children: `Se léver` },
      { children: `Mettre en garde` },
      { children: `Puiser dans votre instinct` },
    ],
  },
]];

export default Intro;

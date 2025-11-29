import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { Card, CardContent, Typography, Box, Grid, Stack, Avatar } from '@mui/material';
import './Frontend.css';

const About = () => {
  const { language } = useContext(LanguageContext);
  // Add keyframes for About page gradient animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes aboutGradient {
        0% {background-position:0% 50%;}
        25% {background-position:50% 100%;}
        50% {background-position:100% 50%;}
        75% {background-position:50% 0%;}
        100% {background-position:0% 50%;}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);
  const translations = {
  en: {
      aboutTitle: "About Our Mission",
      aboutLead: "Preserving and promoting India's incredible cultural heritage for future generations",
      purposeTitle: "Our Purpose",
      purposeDesc1: "The Indian Culture & Heritage Awareness Website is dedicated to showcasing the rich tapestry of India's cultural traditions, festivals, monuments, and heritage sites. Our mission is to educate, inspire, and preserve the incredible diversity that makes India truly unique.",
      purposeDesc2: "Through this platform, we aim to bridge the gap between ancient wisdom and modern accessibility, making India's cultural wealth available to people around the world.",
      valuesTitle: "What We Stand For",
      education: "Education",
      educationDesc: "We believe in the power of knowledge to foster understanding and appreciation of India's diverse cultural landscape.",
      preservation: "Preservation",
      preservationDesc: "Protecting and documenting cultural traditions, monuments, and heritage sites for future generations to experience.",
      unity: "Unity in Diversity",
      unityDesc: "Celebrating the beautiful diversity of Indian culture while highlighting the common threads that unite us all.",
      globalReach: "Global Reach",
      globalReachDesc: "Making Indian culture accessible to a global audience and fostering cross-cultural understanding and appreciation.",
      impactTitle: "Our Impact",
      impactDesc: "Since our inception, we have been committed to creating meaningful impact in cultural preservation and education:",
      impactList: [
        "Cultural Documentation: Comprehensive coverage of India's major festivals, traditions, and cultural practices.",
        "Monument Awareness: Detailed information about historical monuments with visiting guidelines and significance.",
        "Educational Resources: Creating accessible content for students, researchers, and cultural enthusiasts.",
        "Global Outreach: Connecting people worldwide with India's rich cultural heritage."
      ],
      teamTitle: "Behind the Mission",
      teamIntro: "Our team consists of passionate individuals dedicated to preserving and sharing India's cultural wealth with the world.",
      researcher: "Cultural Researchers",
      researcherDesc: "Expert historians and cultural anthropologists who ensure accuracy and depth in our content.",
      tech: "Technology Team",
      techDesc: "Skilled developers and designers making cultural heritage accessible through modern technology.",
      creator: "Content Creators",
  creatorDesc: "Talented writers and visual artists who bring India's stories to life with engaging content."
    },
    hi: {
      aboutTitle: "हमारे मिशन के बारे में",
      aboutLead: "भविष्य की पीढ़ियों के लिए भारत की अद्भुत सांस्कृतिक विरासत को संरक्षित और बढ़ावा देना",
      purposeTitle: "हमारा उद्देश्य",
      purposeDesc1: "भारतीय संस्कृति और विरासत जागरूकता वेबसाइट भारत की सांस्कृतिक परंपराओं, त्योहारों, स्मारकों और विरासत स्थलों की समृद्धता को प्रदर्शित करने के लिए समर्पित है। हमारा मिशन भारत की अद्भुत विविधता को शिक्षित करना, प्रेरित करना और संरक्षित करना है।",
      purposeDesc2: "इस मंच के माध्यम से, हम प्राचीन ज्ञान और आधुनिक पहुंच के बीच की खाई को पाटने का प्रयास करते हैं, जिससे भारत की सांस्कृतिक संपदा दुनिया भर के लोगों के लिए उपलब्ध हो सके।",
      valuesTitle: "हमारे मूल्यों",
      education: "शिक्षा",
      educationDesc: "हम ज्ञान की शक्ति में विश्वास करते हैं जो भारत के विविध सांस्कृतिक परिदृश्य की समझ और सराहना को बढ़ावा देती है।",
      preservation: "संरक्षण",
      preservationDesc: "भविष्य की पीढ़ियों के लिए सांस्कृतिक परंपराओं, स्मारकों और विरासत स्थलों की रक्षा और दस्तावेजीकरण।",
      unity: "विविधता में एकता",
      unityDesc: "भारतीय संस्कृति की सुंदर विविधता का जश्न मनाना और हमें जोड़ने वाले सामान्य सूत्रों को उजागर करना।",
      globalReach: "वैश्विक पहुँच",
      globalReachDesc: "भारतीय संस्कृति को वैश्विक दर्शकों के लिए सुलभ बनाना और पार-सांस्कृतिक समझ और सराहना को बढ़ावा देना।",
      impactTitle: "हमारा प्रभाव",
      impactDesc: "हमारी स्थापना के बाद से, हम सांस्कृतिक संरक्षण और शिक्षा में सार्थक प्रभाव डालने के लिए प्रतिबद्ध हैं:",
      impactList: [
        "सांस्कृतिक दस्तावेजीकरण: भारत के प्रमुख त्योहारों, परंपराओं और सांस्कृतिक प्रथाओं का व्यापक कवरेज।",
        "स्मारक जागरूकता: ऐतिहासिक स्मारकों के बारे में विस्तृत जानकारी, यात्रा दिशानिर्देश और महत्व।",
        "शैक्षिक संसाधन: छात्रों, शोधकर्ताओं और सांस्कृतिक उत्साही लोगों के लिए सुलभ सामग्री बनाना।",
        "वैश्विक आउटरीच: दुनिया भर के लोगों को भारत की समृद्ध सांस्कृतिक विरासत से जोड़ना।"
      ],
      teamTitle: "मिशन के पीछे",
      teamIntro: "हमारी टीम में ऐसे उत्साही लोग शामिल हैं जो भारत की सांस्कृतिक संपदा को दुनिया के साथ साझा करने के लिए समर्पित हैं।",
      researcher: "सांस्कृतिक शोधकर्ता",
      researcherDesc: "विशेषज्ञ इतिहासकार और सांस्कृतिक मानवविज्ञानी जो हमारी सामग्री में सटीकता और गहराई सुनिश्चित करते हैं।",
      tech: "प्रौद्योगिकी टीम",
      techDesc: "कुशल डेवलपर्स और डिजाइनर जो आधुनिक तकनीक के माध्यम से सांस्कृतिक विरासत को सुलभ बनाते हैं।",
      creator: "सामग्री निर्माता",
  creatorDesc: "प्रतिभाशाली लेखक और दृश्य कलाकार जो भारत की कहानियों को आकर्षक सामग्री के साथ जीवंत बनाते हैं।"
    },
    te: {
      aboutTitle: "మా మిషన్ గురించి",
      aboutLead: "భవిష్యత్ తరాలకు భారతదేశపు అద్భుతమైన సాంస్కృతిక వారసత్వాన్ని సంరక్షించడం మరియు ప్రోత్సహించడం",
      purposeTitle: "మా లక్ష్యం",
      purposeDesc1: "ఇండియన్ కల్చర్ & హెరిటేజ్ అవేర్‌నెస్ వెబ్‌సైట్ భారతదేశపు సాంస్కృతిక సంప్రదాయాలు, పండుగలు, స్మారకాలు మరియు వారసత్వ స్థలాలను ప్రదర్శించడానికి అంకితం చేయబడింది. మా లక్ష్యం భారతదేశపు అద్భుతమైన వైవిధ్యాన్ని విద్య, ప్రేరణ మరియు సంరక్షణ చేయడం.",
      purposeDesc2: "ఈ ప్లాట్‌ఫారమ్ ద్వారా, మేము పురాతన జ్ఞానం మరియు ఆధునిక ప్రాప్యత మధ్య ఉన్న అంతరాన్ని తగ్గించడానికి, భారతదేశపు సాంస్కృతిక సంపదను ప్రపంచవ్యాప్తంగా ప్రజలకు అందుబాటులోకి తేవడాన్ని లక్ష్యంగా పెట్టుకున్నాము.",
      valuesTitle: "మేము నిలబడే విలువలు",
      education: "విద్య",
      educationDesc: "భారతదేశపు వైవిధ్యమైన సాంస్కృతిక దృశ్యాన్ని అర్థం చేసుకోవడానికి మరియు అభినందించడానికి జ్ఞానం శక్తిలో మేము నమ్మకం కలిగి ఉన్నాము.",
      preservation: "సంరక్షణ",
      preservationDesc: "భవిష్యత్ తరాలకు సాంస్కృతిక సంప్రదాయాలు, స్మారకాలు మరియు వారసత్వ స్థలాలను రక్షించడం మరియు డాక్యుమెంటేషన్ చేయడం.",
      unity: "వైవిధ్యంలో ఐక్యత",
      unityDesc: "భారతదేశపు అందమైన వైవిధ్యాన్ని జరుపుకోవడం మరియు మనందరినీ కలిపే సామాన్యమైన అంశాలను హైలైట్ చేయడం.",
      globalReach: "ప్రపంచవ్యాప్త చేరిక",
      globalReachDesc: "భారతదేశపు సంస్కృతిని ప్రపంచవ్యాప్తంగా ప్రజలకు అందుబాటులోకి తేవడం మరియు సాంస్కృతిక పరస్పర అవగాహన మరియు అభినందనను ప్రోత్సహించడం.",
      impactTitle: "మా ప్రభావం",
      impactDesc: "మా స్థాపన నుండి, మేము సాంస్కృతిక సంరక్షణ మరియు విద్యలో అర్థవంతమైన ప్రభావాన్ని సృష్టించడానికి కట్టుబడి ఉన్నాము:",
      impactList: [
        "సాంస్కృతిక డాక్యుమెంటేషన్: భారతదేశపు ప్రధాన పండుగలు, సంప్రదాయాలు మరియు సాంస్కృతిక ఆచారాల సమగ్ర కవరేజ్.",
        "స్మారక అవగాహన: చారిత్రక స్మారకాలు, సందర్శన మార్గదర్శకాలు మరియు ప్రాముఖ్యత గురించి వివరమైన సమాచారం.",
        "విద్యా వనరులు: విద్యార్థులు, పరిశోధకులు మరియు సాంస్కృతిక ఉత్సాహులు కోసం అందుబాటులో ఉన్న కంటెంట్.",
        "ప్రపంచవ్యాప్త అవుట్‌రీచ్: భారతదేశపు గొప్ప సాంస్కృతిక వారసత్వాన్ని ప్రపంచవ్యాప్తంగా ప్రజలకు కనెక్ట్ చేయడం."
      ],
      teamTitle: "మిషన్ వెనుక",
      teamIntro: "మా బృందం భారతదేశపు సాంస్కృతిక సంపదను ప్రపంచంతో పంచుకోవడానికి అంకితం చేయబడిన ఉత్సాహభరిత వ్యక్తులతో కూడి ఉంది.",
      researcher: "సాంస్కృతిక పరిశోధకులు",
      researcherDesc: "నిపుణులైన చరిత్రకారులు మరియు సాంస్కృతిక మానవశాస్త్రవేత్తలు మా కంటెంట్‌లో ఖచ్చితత్వం మరియు లోతును నిర్ధారిస్తారు.",
      tech: "టెక్నాలజీ బృందం",
      techDesc: "ఆధునిక సాంకేతికత ద్వారా సాంస్కృతిక వారసత్వాన్ని అందుబాటులోకి తేవడంలో నైపుణ్యం కలిగిన డెవలపర్లు మరియు డిజైనర్లు.",
      creator: "కంటెంట్ క్రియేటర్లు",
  creatorDesc: "ప్రతిభావంతులైన రచయితలు మరియు విజువల్ ఆర్టిస్టులు భారతదేశపు కథలను ఆకట్టుకునే కంటెంట్‌తో జీవితం తెస్తారు."
    }
  };
  const t = translations[language] || translations['en'];
  return (
    <div
      className="about-container"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(270deg, #e5dbbc)',
        backgroundSize: '1600% 1600%',
        animation: 'aboutGradient 20s ease infinite'
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>{t.aboutTitle}</h1>
          <p className="lead">
            {t.aboutLead}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '32px 0' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t.purposeTitle}</h2>
            <p style={{ textAlign: 'center', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '16px' }}>{t.purposeDesc1}</p>
            <p style={{ textAlign: 'center', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '24px' }}>{t.purposeDesc2}</p>
            <img src="india2.png" alt="Our Purpose" style={{ display: 'block', margin: '0 auto', maxWidth: '320px', borderRadius: '1rem', boxShadow: '0 2px 16px #0001' }} />
          </div>
        </section>

        {/* Comprehensive Overview Section */}
        <section className="overview-section" style={{ padding: '60px 20px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '40px', fontSize: '2.5rem', color: '#333', textAlign: 'center' }}>Our Platform Overview</h2>
            
            <div className="overview-content" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🎯 Mission and Vision</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>We inspire awareness, preserve, and promote the rich cultural heritage, traditions, and historical monuments of India for a diverse and global audience. Our platform leverages technology to make learning about Indian heritage engaging and accessible, especially for younger generations and international explorers.</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🌟 What the Web App Offers</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>Experience multimedia content—videos, images, and interactive elements—for immersive learning about festivals, traditional arts, music, dance, cuisine, and historical monuments. Explore virtual tours, 3D explorations, and interactive maps that allow you to discover famous historical sites and dive into their stories as though you were physically present.</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>👥 Who the Web App Is For</h3>
                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', margin: '0 auto', maxWidth: '800px', textAlign: 'justify' }}>
                  <div style={{ marginBottom: '15px' }}><strong>Cultural Enthusiasts:</strong> Experience virtual tours, engage with multimedia content, and join cultural conversations</div>
                  <div style={{ marginBottom: '15px' }}><strong>Content Creators:</strong> Help keep educational materials current and design interactive experiences</div>
                  <div style={{ marginBottom: '15px' }}><strong>Tour Guides:</strong> Provide expert narration and live support during virtual explorations</div>
                  <div><strong>Admins:</strong> Curate, fact-check, and maintain platform quality</div>
                </div>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>✨ Unique Features</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>Responsive design and multilingual support maximize accessibility across devices and for users with diverse backgrounds. Community features include feedback, cultural exchange forums, and the ability to suggest new content. Social media integration enables sharing experiences and increases outreach.</p>
              </div>

              <div className="overview-item">
                <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', color: '#667eea', textAlign: 'center' }}>🛡️ Commitment to Accurate and Inclusive Content</h3>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', textAlign: 'justify', margin: '0 auto', maxWidth: '800px' }}>Our verification process ensures factual accuracy and cultural sensitivity through admin reviews and expert contributions. We're committed to presenting both tangible and intangible heritage—covering not only famous sites and monuments, but also living traditions, languages, and everyday cultural practices.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
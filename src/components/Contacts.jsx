import React from 'react';

export default function Contacts() {
  const contacts = [
    {
      name: "Harshit",
      title: "no one knows",
      avatar: <img src="./contacts/harshit.jpg" alt="" />,
      phone: "jus check your phone",
      email: "harsh.is.offline@instagram.com",
      location: "Kathie ka heart",
      badge: "🍡 Dorayaki Lover",
      bgColor: "#3B82F6"
    },
    {
      name: "Doraemon",
      title: "gadget giver ",
      avatar: <img src="./contacts/doraemon.png" alt="" />,
      phone: "22nd Century Hotline",
      email: "doracake@future.jp",
      location: "Nobita's Desk Drawer",
      badge: "🍡 Dorayaki Lover",
      bgColor: "#3B82F6"
    },
    {
      name: "Snoopy",
      title: "bestie vestie",
      avatar: <img src="./contacts/snoopy.png" alt="" />,
      phone: "1234-kathie-ka-fav",
      email: "cutie@bhondudoggie.com",
      location: "Some random ass show",
      badge: "✨ Snip Snip Champion",
      bgColor: "#F87171"
    },
    {
      name: "Nobita Nobi",
      title: "katherine ka twin",
      avatar: <img src="./contacts/nobita.png" alt="" />,
      phone: "555-LAZY-LIKE_KAE",
      email: "zero.homework@neverdo.com",
      location: "Bedroom Floor, Tokyo",
      badge: "💤 0% Test Score Expert",
      bgColor: "#FBBF24"
    },
    {
      name: "Harry Potter",
      title: "The Boy Who Lived",
      avatar: <img src="./contacts/harry.png" alt="" />,
      phone: "🦉 Owl Post Only",
      email: "thechosen1@hogwarts.edu",
      location: "Hogwarts, UK",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "Laveena",
      title: "katie ki cutie",
      avatar: <img src="./contacts/laveena.jpg" alt="" />,
      phone: "102 - she can fix you",
      email: "chatpatiipavbhaji@instagram.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "Tanya",
      title: "Kathie's Jaan",
      avatar: <img src="./contacts/tanya.jpg" alt="" />,
      phone: "some random number",
      email: "tanya_bhatnagar_21_@gmail.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "Chipki",
      title: "katie ki bestie",
      avatar: <img src="./contacts/chipki.jpg" alt="" />,
      phone: "999 - pookie pookie",
      email: "i.zzyink@instagram.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "Khekda / saulipop",
      title: "sus friend",
      avatar: <img src="./contacts/khekda.jpg" alt="" />,
      phone: "ocean of sus",
      email: "saulipop@sus.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "rasberry",
      title: "some berry i guess",
      avatar: <img src="./contacts/rasberry.jpg" alt="" />,
      phone: "berry farm",
      email: "rasberry@instagram.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "sneha",
      title: "content creator",
      avatar: <img src="./contacts/sneha.jpg" alt="" />,
      phone: "bohot achhi dost",
      email: "sneha__bathre@instagram.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
    {
      name: "prerna",
      title: "lilliput friend",
      avatar: <img src="./contacts/prerna.jpg" alt="" />,
      phone: "bestest bestie",
      email: "unchillpre.o_o@instagram.com",
      location: "Kathie ka heart",
      badge: "🪄 Expelliarmus Specialist",
      bgColor: "#9333EA"
    },
  ];

  return (
    <div  className='h-screen overflow-y-scroll' style={{ backgroundColor: '#F3F4F6' }}>
      {/* iOS-style header */}
      <div style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #E5E7EB',
        padding: '16px 20px'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#111827',
          margin: 0
        }}>
          Contacts
        </h1>
      </div>

      {/* Contact cards */}
      <div style={{ padding: '20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {contacts.map((contact, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Avatar section */}
              <div style={{ padding: '24px 24px 16px', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: contact.bgColor,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  {contact.avatar}
                </div>
                
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  margin: '0 0 8px 0'
                }}>
                  {contact.name}
                </h2>
                
                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {contact.title}
                </p>
              </div>
              
              {/* Info section */}
              <div style={{ padding: '0 16px 16px' }}>
                <div style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>📞</span>
                  <span style={{ fontSize: '14px', color: '#374151', flex: 1 }}>{contact.phone}</span>
                </div>
                
                <div style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>✉️</span>
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#374151', 
                    flex: 1,
                    wordBreak: 'break-all'
                  }}>{contact.email}</span>
                </div>
                
                <div style={{
                  backgroundColor: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ fontSize: '16px', marginRight: '8px' }}>📍</span>
                  <span style={{ fontSize: '14px', color: '#374151', flex: 1 }}>{contact.location}</span>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
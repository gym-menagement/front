import { useNavigate } from 'react-router-dom';
import mobbinTheme from '../theme/mobbin.json';

const LandingPage = () => {
  const navigate = useNavigate();
  const { colors, typography, layout, components } = mobbinTheme;

  // Helper for styles based on theme
  const containerStyle = {
    maxWidth: layout.maxWidth,
    paddingLeft: layout.padding.containerX,
    paddingRight: layout.padding.containerX,
    marginLeft: 'auto',
    marginRight: 'auto',
  };





  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background.main, fontFamily: typography.fontFamily }}>
      {/* Navbar */}
      <nav 
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          backgroundColor: '#f3f4f6', // Light gray like the image
          borderRadius: '9999px',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'auto',
          minWidth: '600px', // Give it some width
          maxWidth: '90%',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
           {/* Simple icon placeholder */}
           <div className="w-6 h-6 bg-black rounded-sm"></div>
           Gym Management
        </div>
        <div className="flex gap-6 items-center text-sm font-medium">
          <button 
            onClick={() => navigate('/login')}
            className="hover:text-gray-600 transition-colors"
            style={{
              height: '30px', 
              padding: '0 20px', 
              fontSize: '16px',
              fontWeight: typography.fontWeights.bold,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            로그인
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="hover:text-gray-600 transition-colors"
            style={{
              height: '30px', 
              padding: '0 0px', 
              fontSize: '16px',
              fontWeight: typography.fontWeights.bold,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            회원가입
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div style={{ ...containerStyle, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 
            style={{ 
              fontSize: typography.fontSizes.h1, 
              fontWeight: typography.fontWeights.bold,
              color: colors.text.primary,
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'center', // Ensure text alignment
            }}
          >
            올인원 <br/> <span style={{ color: colors.text.secondary }}>헬스장 관리 솔루션</span>
          </h1>
          <p 
            style={{ 
              fontSize: '20px', 
              color: colors.text.secondary, 
              maxWidth: '600px', 
              margin: '0 auto 40px auto',
              lineHeight: 1.5
            }}
          >
            효율성을 극대화하고 회원을 관리하며, 포괄적인 관리 플랫폼으로 피트니스 비즈니스를 성장시키세요.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              style={{
                backgroundColor: components.button.primary.backgroundColor,
                color: components.button.primary.textColor,
                borderRadius: components.button.primary.borderRadius,
                height: '56px', 
                padding: '0 32px', 
                fontSize: '16px',
                fontWeight: typography.fontWeights.bold,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => navigate('/login')}
            >
              무료로 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
       <section style={{ paddingBottom: '120px', backgroundColor: colors.background.secondary }}>
        <div style={{ ...containerStyle, paddingTop: '80px' }}>
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
             <h2 style={{ fontSize: typography.fontSizes.h2, fontWeight: typography.fontWeights.bold, marginBottom: '16px' }}>
               강력한 기능
             </h2>
             <p style={{ color: colors.text.secondary }}>헬스장 운영을 원활하게 하기 위한 모든 것.</p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
              gap: layout.grid.gap 
            }}
          >
            {/* Feature Cards */}
            {[
              { title: "회원 관리", desc: "출석, 회원권, 결제 내역을 한곳에서 관리하세요." },
              { title: "트레이너 일정", desc: "PT 세션과 트레이너 배정을 손쉽게 관리하세요." },
              { title: "재무 보고서", desc: "매출, 지출, 성장 추세에 대한 인사이트를 얻으세요." },
              { title: "건강 추적", desc: "회원이 운동 기록을 남기고 건강 상태를 추적할 수 있습니다." },
              { title: "출입 통제", desc: "QR 코드 통합으로 원활한 헬스장 입출입을 지원합니다." },
              { title: "관리자 대시보드", desc: "헬스장 성과를 한눈에 파악할 수 있는 완벽한 개요를 제공합니다." }
            ].map((feature, i) => (
              <div 
                key={i}
                style={{
                  backgroundColor: components.card.backgroundColor,
                  borderRadius: components.card.borderRadius,
                  border: components.card.border,
                  padding: '32px',
                  boxShadow: 'none', // Mobbin cards are often flat or very subtle
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'default',
                  textAlign: 'center', // Center text in cards
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                className="hover:shadow-md hover:-translate-y-1"
              >
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: colors.text.secondary, lineHeight: 1.5 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #E5E5E5', padding: '80px 0 20px 0', backgroundColor: '#fff' }}>
        <div style={{ ...containerStyle, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
           <div style={{ display: 'flex', gap: '24px', fontSize: '14px', fontWeight: 500, color: '#4b5563' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-black">개인정보 처리방침</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-black">서비스 이용약관</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }} className="hover:text-black">고객센터</a>
           </div>
           <div style={{ fontSize: '14px', color: '#6b7280' }}>
             &copy; {new Date().getFullYear()} Gym Management System. All rights reserved.
           </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

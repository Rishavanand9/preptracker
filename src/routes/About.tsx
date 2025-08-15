import styled from 'styled-components';
import { BookOpen, Target, Users, Zap } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  transition: all 0.2s ease;
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Hero = styled.div`
  text-align: center;
  padding: 4rem 0;
  animation: fadeInUp 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: var(--muted-foreground);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const FeatureCard = styled.div`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-color: var(--blue-200);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--blue-600), var(--blue-400));
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--muted-foreground);
  line-height: 1.6;
`;

const ContentSection = styled.div`
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 3rem;
  margin: 4rem 0;
  animation: fadeInUp 0.8s ease-out 0.2s both;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--foreground);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SectionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: var(--muted-foreground);
  line-height: 1.8;
  font-size: 1.125rem;
`;

function About() {
  return (
    <Container>
      <Main>
        <Hero>
          <Title>About Google Prep Tracker</Title>
          <Subtitle>
            A comprehensive tool designed to help you track and manage your 1-year preparation journey 
            for technical interviews and career advancement.
          </Subtitle>
        </Hero>

        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <Target size={24} />
            </FeatureIcon>
            <FeatureTitle>Goal-Oriented</FeatureTitle>
            <FeatureDescription>
              Break down your preparation into manageable weekly milestones with clear objectives and progress tracking.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <BookOpen size={24} />
            </FeatureIcon>
            <FeatureTitle>Note Taking</FeatureTitle>
            <FeatureDescription>
              Capture your learnings, insights, and important concepts with an integrated note-taking system.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Zap size={24} />
            </FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDescription>
              Visual progress indicators and completion tracking to keep you motivated and on track.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <Users size={24} />
            </FeatureIcon>
            <FeatureTitle>Personalized</FeatureTitle>
            <FeatureDescription>
              Customize your preparation schedule and adapt it to your learning style and pace.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>

        <ContentSection>
          <SectionTitle>How It Works</SectionTitle>
          <SectionContent>
            <p>
              Google Prep Tracker is built around the concept of structured learning over time. 
              The application provides a comprehensive 52-week preparation schedule that covers all 
              essential topics for technical interviews.
            </p>
            <br />
            <p>
              Each week focuses on specific concepts, algorithms, or problem-solving techniques. 
              You can mark weeks as completed, add personal notes, and track your overall progress 
              through visual indicators and statistics.
            </p>
            <br />
            <p>
              The tool also includes features for exporting and importing your progress, allowing 
              you to backup your data or continue your preparation journey across different devices.
            </p>
          </SectionContent>
        </ContentSection>

        <ContentSection>
          <SectionTitle>Why Use This Tool?</SectionTitle>
          <SectionContent>
            <p>
              Preparation for technical interviews can be overwhelming without proper structure. 
              This tracker provides a clear roadmap, helping you stay organized and focused on 
              your learning objectives.
            </p>
            <br />
            <p>
              By breaking down the preparation into weekly chunks, you can maintain consistent 
              progress while avoiding burnout. The note-taking feature ensures that your insights 
              and learnings are preserved for future reference.
            </p>
            <br />
            <p>
              Whether you're a recent graduate, career switcher, or experienced professional 
              looking to advance, this tool adapts to your needs and helps you build a strong 
              foundation for technical interviews.
            </p>
          </SectionContent>
        </ContentSection>
      </Main>
    </Container>
  );
}

export default About;

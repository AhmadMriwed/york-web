import React, { FC } from "react";

type Props = {};

const SectionTitle: FC<{ title: string }> = ({ title }) => (
  <h3 className="font-bold text-black mb-4">{title}</h3>
);

const Paragraph: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="my-4 text-gray-500">{children}</p>
);

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div style={{ position: "relative", paddingBottom: "100%", height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="w-full h-72"
      />
    </div>
  );
};

const AboutPage: FC<Props> = () => {
  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="about-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title">About Us</h1>
      </div>

      {/* Content Section */}
      <section className="container mx-auto my-14 px-4">
        <div className=" border-l-[5px] border-primary-color2 p-6">
          <div className="md:border-l-[5px] border-primary-color2 md:p-6  h-[400px] m-2">
            <h1 className="font-bold text-2xl text-primary-color1 mb-6">
              Who we are
            </h1>
            <div className="h-[300px] w-[300px] md:w-[600px] ">
              <YouTubeEmbed videoId="ZGy0rQF0OME" />
            </div>
          </div>
          <div className="uppercase">
            York British Academy registered office in England and Wales. In the
            United Kingdom, its main objective is to provide training and
            advisory services and strategic solutions for postgraduate studies
            in higher education, cultural education, educational support
            services.
          </div>
        </div>

        {/* Introduction */}
        <article>
          <Paragraph>
            It has agents, representatives, and partnerships in the EU and East
            Asia, providing services in regional and international environments.
            Nowadays, companies understand the importance of internal training
            to improve employee performance and achieve strategic goals.
          </Paragraph>
          <Paragraph>
            With an updated education model that gains more attention, many
            companies view courses as a practical option to train, develop, and
            empower teams.
          </Paragraph>
          <Paragraph>
            Creating great content requires understanding the stages of training
            preparation. Why train your employees with York British Academy? If
            you haven&apos;t applied any training yet, you might wonder how
            important it is. Here are some benefits of corporate training.
          </Paragraph>
        </article>

        {/* Training Benefits */}
        <div className="mt-8">
          <SectionTitle title="1. Empowering Employees" />
          <Paragraph>
            One of the main objectives of training is to enable employees to
            perform their jobs effectively. Even with efficient hiring, without
            proper training, it&apos;s challenging to ensure employees reach
            their full potential and drive results.
          </Paragraph>
          <Paragraph>
            York British Academy specializes in training programs such as:
            Quality &amp; Insurance, Statistics, IT Management, Banking &amp;
            Investments, Oil &amp; Gas, Security &amp; Safety, Project
            Management, Strategic Planning, HR, Media, Marketing &amp; Sales,
            and Legal Skills.
          </Paragraph>
          <Paragraph>
            Empower your employees with York British Academy. Training
            isn&apos;t just for new hires; it&apos;s also essential for
            long-term staff to stay updated on best practices and market trends,
            ensuring continuous performance improvements.
          </Paragraph>
        </div>

        {/* Aligning Employees with Company Goals */}
        <div className="my-10">
          <SectionTitle title="2. Aligning Employees with Company Objectives" />
          <Paragraph>
            For a company to achieve its goals, employees need to align with
            organizational strategies. Mastery of tasks is ineffective if
            actions don&apos;t contribute to business objectives.
          </Paragraph>
        </div>

        {/* Process Improvement */}
        <div className="my-10">
          <SectionTitle title="3. Improving Processes & Correcting Mistakes" />
          <Paragraph>
            Day-to-day activities can make it challenging to address mistakes or
            improvements. Corporate training offers an ideal opportunity to
            highlight areas for improvement, deliver solutions, and enhance team
            performance.
          </Paragraph>
          <Paragraph>
            York British Academy provides consulting services based on a
            comprehensive methodology covering quality, process reengineering,
            HR development, and ISO standards (ISO 9000-2000 and ISO 14000).
          </Paragraph>
        </div>

        {/* Spatial Training Advantages */}
        <div className="my-10">
          <SectionTitle title="Advantages of Spatial Training" />
          <Paragraph>
            Spatial training, although new, offers significant benefits in an
            organizational environment:
          </Paragraph>
          <ul className="list-disc list-inside ml-6">
            <li className="my-2">
              <strong>Employee Interaction:</strong> Facilitates knowledge
              sharing among staff from different teams.
            </li>
            <li className="my-2">
              <strong>Real-time Q&amp;A:</strong> Allows immediate clarification
              of doubts, promoting a dynamic learning environment.
            </li>
            <li className="my-2">
              <strong>Flexibility &amp; Dynamism:</strong> Group activities help
              break barriers, foster teamwork, and ensure knowledge transfer.
            </li>
          </ul>
        </div>

        {/* Conclusion */}
        <div className="my-10">
          <SectionTitle title="Our Vision" />
          <Paragraph>
            York British Academy aims to integrate metacognitive strategies to
            develop thinking skills, enhance learning retention, and elevate
            quality and confidence in training programs. We focus on measurable
            benefits to increase employee productivity and, consequently,
            company profitability.
          </Paragraph>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

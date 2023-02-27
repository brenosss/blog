import Head from 'next/head'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getWorkExperiences, getTextSection } from '@/lib/api/resources'

function SpeakingSection({ children, ...props }) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({ title, description, event }) {
  return (
    <Card>
      <Card.Title as="h3">
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
    </Card>
  )
}

export default function Resume({ workExperiences, textSection }) {
  console.log(textSection)
  return (
    <>
      <Head>
        <title>Speaking - Spencer Sharp</title>
        <meta
          name="description"
          content="I’ve spoken at events all around the world and been interviewed for many podcasts."
        />
      </Head>
      <SimpleLayout
        title={textSection.data[0].attributes.section.title}
        intro={textSection.data[0].attributes.section.description}
      >
        <div className="space-y-20">
          {workExperiences.data.map((workExperience) => (
            <SpeakingSection title={workExperience.attributes.company} key={workExperience.id} >
              <Appearance
                title={workExperience.attributes.role}
                description={workExperience.attributes.description}
                event={`from ${workExperience.attributes.startDate} to ${workExperience.attributes.endDate}`}
              />
            </SpeakingSection>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      textSection: await getTextSection('resume'),
      workExperiences: await getWorkExperiences(),
    },
  }
}
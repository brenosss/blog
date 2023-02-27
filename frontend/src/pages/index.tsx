import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getWorkExperiences, getStrapiProfile, getArticles } from '@/lib/api/resources'
import { BriefcaseIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.id}`}>
        {article.attributes.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.attributes.publishedAt} decorate>
        {article.attributes.publishedAt}
      </Card.Eyebrow>
      <Card.Description>{article.attributes.body}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume({ workExperiences }) {
  return (
    <div>
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 ">
        <BriefcaseIcon className="h-6 w-6 flex-none text-zinc-600 dark:text-zinc-400" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {workExperiences.data.map((workExperience) => (
          <>
          <li key={workExperience.id} className="flex gap-4 group/work relative cursor-pointer" onClick={() => window.location.href = '/resume'}>
            <div className="absolute -inset-y-1 -inset-x-1 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover/work:scale-100 group-hover/work:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-1 sm:rounded-2xl"> 
            </div>
            <div className="relative flex h-14 w-14 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={"http://localhost:1337" + workExperience.attributes.logo.data.attributes.url} width={10} height={10} alt="" className="h-10 w-10 rounded-full" />
            </div>
              <dl className="flex flex-auto flex-wrap gap-x-2 z-20"> 
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {workExperience.attributes.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {workExperience.attributes.role}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={workExperience.attributes.endDate}
                >
                  <time dateTime={workExperience.attributes.startDate}>
                    {workExperience.attributes.startDate}
                  </time>{' '}
                  <span aria-hidden="true">—</span>{' '}
                  <time dateTime={workExperience.attributes.endDate}>
                    {workExperience.attributes.endDate}
                  </time>
                </dd>
              </dl>
          </li>
          </>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

export default function Home({ articles, profile, workExperiences }) {
  return (
    <>
      <Head>
        <title>
          { profile.data.attributes.fullName }
        </title>
        <meta
          name="description"
          content={ profile.data.attributes.description }
        />
      </Head>
      <Container className="mt-24 md:mt-28">
        <div className="lg:grid grid-cols-3">
        {!!profile.data.attributes.photo.data && (
          <div
            key={profile.data.attributes.photo.data.id}
            className={clsx(
              'col-span-1 relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
            )}
          >
            <Image
              src={"http://localhost:1337" + profile.data.attributes.photo.data.attributes.url}
              width={profile.data.attributes.photo.data.attributes.width}
              height={profile.data.attributes.photo.data.attributes.height}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
          <div className='col-span-2 ml-2 mt-4 lg:mt-0'>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              { profile.data.attributes.title }
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              { profile.data.attributes.description }
            </p>

          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://instagram.com"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div>
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100 ">
              <DocumentTextIcon className="h-6 w-6 flex-none text-zinc-600 dark:text-zinc-400" />
              <span className="ml-3">Articles</span>
            </h2>
            <div className="flex flex-col gap-16 mt-6">
              {articles.data.map((article) => (
                <Article key={article.slug} article={article} />
              ))}
            </div>
          </div>
          {!!workExperiences && workExperiences.data.length && (
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              <Resume workExperiences={workExperiences}/>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: await getArticles(),
      profile: await getStrapiProfile(),
      workExperiences: await getWorkExperiences(),
    },
  }
}

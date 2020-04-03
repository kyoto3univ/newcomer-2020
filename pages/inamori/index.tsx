import Head from 'next/head';
import { ClassList } from '../../components/ClassList';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';

export default () => {
  return (
    <>
      <Head>
        <title>3大学共同授業の案内</title>
      </Head>
      <Container>
        <section>
          <SectionTitle>3大学共同授業とは</SectionTitle>
          <p>xxx yyy zzz</p>
        </section>
        <section>
          <SectionTitle>授業一覧</SectionTitle>
          <ClassList
            classes={[
              {
                title: 'てすと',
                description:
                  'ああああああああああああああああああああああああ,ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
                hour: 3,
                link: '/inamori/1',
              },
            ]}
          />
        </section>
      </Container>
    </>
  );
};

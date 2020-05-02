import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchClass, fetchClassList } from '../../api/contentful/class';
import { Button } from '../../components/Button';
import { CategoryList } from '../../components/CategoryList';
import { ClassTitle } from '../../components/class/ClassTitle';
import {
  ReactionCard,
  ReactionCardContainer,
} from '../../components/class/ReactionCard';
import { Collapse } from '../../components/Collapse';
import { Container } from '../../components/Container';
import { Dl } from '../../components/DescriptionList';
import { Ogp } from '../../components/Ogp';
import { Pager } from '../../components/Pager';
import { PreWrapP } from '../../components/PreWrapP';
import { ExtractPromise } from '../../utils/return-type';

const MetaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  overflow-wrap: break-word;
`;
const CollapseTitle = styled.h4`
  display: inline-block;
  margin-bottom: 0;
`;
const CollapseContent = styled(PreWrapP)`
  margin-top: 0;
`;
const NewPostButton = styled(Button)`
  margin-top: 1em;
`;
type Props = {
  classInfo: ExtractPromise<ReturnType<typeof fetchClass>>;
};
export default ({ classInfo }: Props) => {
  return (
    <>
      <Head>
        <title>{`${classInfo.title} - 科目紹介`}</title>
        <Ogp
          title={`${classInfo.title} - 科目紹介`}
          description={classInfo.comment ?? '授業紹介'}
        />
      </Head>
      <Container>
        <Pager
          prev={
            classInfo.previousClass
              ? {
                  href: '/class/[id]',
                  as: `/class/${classInfo.previousClass.id}`,
                  title: classInfo.previousClass.title,
                }
              : undefined
          }
          next={
            classInfo.nextClass
              ? {
                  href: '/class/[id]',
                  as: `/class/${classInfo.nextClass.id}`,
                  title: classInfo.nextClass.title,
                }
              : undefined
          }
        />
        <ClassTitle {...classInfo} />
        <CategoryList data={classInfo.tags} />
        <section>
          <h4>担当教員から一言</h4>
          <PreWrapP>{classInfo.comment}</PreWrapP>
        </section>
        <MetaContainer>
          <Dl>
            <dt>担当教員</dt>
            <dd>{classInfo.teachers.join(', ')}</dd>
          </Dl>
          <Dl>
            <dt>教科書</dt>
            <dd>{classInfo.textbook ?? 'なし'}</dd>
          </Dl>
        </MetaContainer>
        <Collapse
          header={<CollapseTitle>成績評価について</CollapseTitle>}
          content={<CollapseContent>{classInfo.evaluation}</CollapseContent>}
        />
        <Collapse
          header={<CollapseTitle>注意事項</CollapseTitle>}
          content={<CollapseContent>{classInfo.notes}</CollapseContent>}
        />
        <section>
          <h4>みんなの感想</h4>
          <ReactionCardContainer>
            {classInfo.reactions.map(({ id, content }) => (
              <ReactionCard content={content} key={id} />
            ))}
          </ReactionCardContainer>
          <NewPostButton
            href='https://forms.gle/Vxdpbo7XcwvybzqC7'
            target='_blank'
          >
            新しく感想を書く
          </NewPostButton>
        </section>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params?.id) throw new Error('id is required');

  const classInfo = await fetchClass(params.id);

  return {
    props: {
      classInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = await fetchClassList();

  return {
    paths: classes.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

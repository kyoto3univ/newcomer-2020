import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import styled from 'styled-components';
import { fetchCategories, fetchClubList } from '../../api/contentful';
import { ClubCard } from '../../components/club/ClubCard';
import { Container } from '../../components/Container';
import { Ogp } from '../../components/Ogp';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
`;

const SelectContainer = styled.div`
  width: 100%;
`;

const ClearLink = styled.a`
  margin-left: 10px;
  word-break: keep-all;
`;

type Props = {
  clubs: ExtractPromise<ReturnType<typeof fetchClubList>>;
  categories: string[];
};
type OptionType = {
  label: string;
  value: string;
};
export default ({ clubs, categories }: Props) => {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (decodeURIComponent(router.asPath).match(/#tags=(.+)/g)) {
      const filter = RegExp.$1?.split(',') || [];
      setCategoryFilter(filter.filter((item) => categories.includes(item)));
    }
  }, [router, router.asPath]);

  const filteredClubs = React.useMemo(() => {
    if (categoryFilter.length === 0) return clubs;

    return clubs.filter((club) =>
      categoryFilter.every((category) => club.categories.includes(category)),
    );
  }, [categoryFilter]);

  const selectOptions: OptionsType<OptionType> = categories.map((category) => ({
    value: category,
    label: category,
  }));

  const selectedOptions: OptionsType<OptionType> = categoryFilter.map(
    (category) => ({
      value: category,
      label: category,
    }),
  );

  const handleSelectChange = React.useCallback(
    (options: ValueType<OptionType>) => {
      // if (options) setCategoryFilter([(options as OptionType).value]);
      if (options) {
        const tags = (options as OptionsType<OptionType>).map(
          ({ value }) => value,
        );

        setCategoryFilter(tags);
        router.replace({
          pathname: router.pathname,
          hash: `tags=${tags.join(',')}`,
        });
      }
    },
    [router.pathname],
  );

  const handleClearFilter = React.useCallback(
    (e: React.SyntheticEvent) => {
      setCategoryFilter([]);
      router.replace({
        pathname: router.pathname,
        hash: null,
      });
      e.preventDefault();

      return false;
    },
    [setCategoryFilter],
  );

  return (
    <>
      <Head>
        <title>クラブ・サークル紹介</title>
      </Head>
      <Ogp
        title='クラブ・サークル紹介'
        description='京都工芸繊維大学のサークル・部活動や他大学のインカレサークルを紹介します'
      />
      <Container>
        <SectionTitle>クラブ・サークル紹介</SectionTitle>
        <FilterContainer>
          <SelectContainer>
            <Select
              options={selectOptions}
              onChange={handleSelectChange}
              value={selectedOptions}
              placeholder='タグで絞り込み'
              isMulti
            />
          </SelectContainer>
          {selectedOptions.length > 0 && (
            <ClearLink onClick={handleClearFilter} href='#'>
              絞り込み解除
            </ClearLink>
          )}
        </FilterContainer>
        {filteredClubs.length > 0 ? (
          filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              title={club.name}
              description={club.shortDescription}
              id={club.id}
              image={club.image}
              categories={club.categories}
            />
          ))
        ) : (
          <p>該当する部活動・サークルはありません</p>
        )}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const clubs = process.env.PREVIEW_MODE ? [] : await fetchClubList();
  const categories = process.env.PREVIEW_MODE ? [] : await fetchCategories();

  return {
    props: {
      clubs,
      categories: categories.map(({ name }) => name),
    },
  };
};

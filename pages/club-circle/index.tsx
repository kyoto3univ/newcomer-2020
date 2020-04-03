import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import styled from 'styled-components';
import { fetchClubList } from '../../api/contentful';
import { ClubCard } from '../../components/ClubCard';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
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
  const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]);

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
      if (options) setCategoryFilter([(options as OptionType).value]);
    },
    [],
  );

  const handleClearFilter = React.useCallback(
    (e: React.SyntheticEvent) => {
      setCategoryFilter([]);
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
      <Container>
        <SectionTitle>クラブ・サークル紹介</SectionTitle>
        <FilterContainer>
          <SelectContainer>
            <Select
              options={selectOptions}
              onChange={handleSelectChange}
              value={selectedOptions}
              placeholder='カテゴリで絞り込み'
            />
          </SelectContainer>
          {selectedOptions.length > 0 && (
            <ClearLink onClick={handleClearFilter} href='#'>
              絞り込み解除
            </ClearLink>
          )}
        </FilterContainer>
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            title={club.name}
            description={club.shortDescription}
            link={`/club-circle/${club.id}`}
            image={club.image}
          />
        ))}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const clubs = await fetchClubList();

  return {
    props: {
      clubs,
      categories: Object.keys(
        clubs.reduce<Record<string, number>>((obj, { categories }) => {
          categories.forEach((category) => (obj[category] = 1));
          return obj;
        }, {}),
      ),
    },
  };
};

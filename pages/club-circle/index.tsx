import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import { fetchClubList } from '../../api/contentful';
import { ClubCard } from '../../components/ClubCard';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

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
      categoryFilter.some((category) => club.categories.includes(category)),
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
      if (options)
        setCategoryFilter(
          (options as OptionsType<OptionType>).map((opt) => opt.value),
        );
    },
    [],
  );

  return (
    <>
      <Head>
        <title>クラブ・サークル紹介</title>
      </Head>
      <Container>
        <SectionTitle>クラブ・サークル紹介</SectionTitle>
        <Select
          options={selectOptions}
          isMulti={true}
          onChange={handleSelectChange}
          value={selectedOptions}
          placeholder='カテゴリで絞り込み'
        />
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

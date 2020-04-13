import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import Select, { OptionsType, ValueType } from 'react-select';
import styled from 'styled-components';
import { fetchClassList } from '../../api/contentful/class';
import { ClassList } from '../../components/class/ClassList';
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
  classes: ExtractPromise<ReturnType<typeof fetchClassList>>;
  hours: Array<{ day: string; time: number }>;
};
type OptionType = {
  label: string;
  value: { day: string; time: number };
};
export default ({ classes, hours }: Props) => {
  const router = useRouter();
  const [hourFilter, setHourFilter] = React.useState<{
    day: string;
    time: number;
  } | null>(null);

  React.useEffect(() => {
    if (decodeURIComponent(router.asPath).match(/#filter=(\w+)-(\d+)/g)) {
      setHourFilter({
        day: RegExp.$1,
        time: Number(RegExp.$2),
      });
    }
  }, [router, router.asPath]);

  const filteredClasses = React.useMemo(() => {
    if (!hourFilter) return classes;

    return classes.filter(
      ({ day, time }) => day === hourFilter.day && time === hourFilter.time,
    );
  }, [hourFilter]);

  const selectOptions: OptionsType<OptionType> = hours.map((hour) => ({
    value: hour,
    label: `${hour.day}曜${hour.time}限`,
  }));

  const selectedOptions: OptionType | null = hourFilter
    ? {
        value: hourFilter,
        label: `${hourFilter.day}曜${hourFilter.time}限`,
      }
    : null;

  const handleSelectChange = React.useCallback(
    (options: ValueType<OptionType>) => {
      // if (options) setCategoryFilter([(options as OptionType).value]);
      if (options) {
        const filter = (options as OptionType).value;

        setHourFilter(filter);
        router.replace({
          pathname: router.pathname,
          hash: `filter=${filter.day}-${filter.time}`,
        });
      }
    },
    [router.pathname],
  );

  const handleClearFilter = React.useCallback(
    (e: React.SyntheticEvent) => {
      setHourFilter(null);
      router.replace({
        pathname: router.pathname,
        hash: null,
      });
      e.preventDefault();

      return false;
    },
    [setHourFilter],
  );
  return (
    <>
      <Head>
        <title>授業の案内</title>
        <Ogp
          title={`授業の案内`}
          description={'授業の内容や感想を紹介します'}
        />
      </Head>
      <Container>
        <section>
          <SectionTitle>授業の選択について</SectionTitle>
          <p>
            ・共同化科目は、全ての科目に「大学ごとの」定員があり、抽選で履修者を決定します。
          </p>
          <p>
            ・抽選では、第5希望まで申し込むことができますが、人気の科目は履修者が集中するので、すべての科目で落選する場合があります。
            その場合は、その時間の科目を履修しないか、受講登録修正期間に空き定員のある授業に登録することになります。
          </p>
          <p>
            ・卒業認定に必要な単位数は、科目分類ごとに指定されているので、履修計画を立てて、授業を選択してください。(履修要項2020を確認してください)
          </p>
          <p>
            {`・共同化科目の科目分類は"人と自然", "人と社会", "人と文化","体の科学", "京の伝統文化と先端科学技術", "環境・倫理"の6種類です。`}
          </p>
        </section>
        <section>
          <SectionTitle>授業一覧</SectionTitle>
          <FilterContainer>
            <SelectContainer>
              <Select
                options={selectOptions}
                onChange={handleSelectChange}
                value={selectedOptions}
                placeholder='時間で絞り込み'
              />
            </SelectContainer>
            {hourFilter && (
              <ClearLink onClick={handleClearFilter} href='#'>
                絞り込み解除
              </ClearLink>
            )}
          </FilterContainer>
          <ClassList classes={filteredClasses} />
        </section>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const classes = await fetchClassList();

  return {
    props: {
      classes,
      hours: Object.values(
        classes.reduce<Record<string, { day: string; time: number }>>(
          (obj, { day, time }) => ({
            ...obj,
            [`${day}-${time}`]: { day, time },
          }),
          {},
        ),
      ),
    },
  };
};

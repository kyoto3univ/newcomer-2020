module.exports = function (migration) {
  const circleInfo = migration
    .createContentType("circleInfo")
    .name("サークル情報")
    .description("")
    .displayField("name");

  circleInfo
    .createField("name")
    .name("団体名")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        unique: true,
      },
      {
        size: {
          max: 50,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("category")
    .name("カテゴリ/タグ")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkContentType: ["Category"],
        },
      ],

      linkType: "Entry",
    });

  circleInfo
    .createField("image")
    .name("一覧用画像")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["image"],
      },
      {
        assetImageDimensions: {
          width: {
            min: 128,
            max: null,
          },

          height: {
            min: 128,
            max: null,
          },
        },
      },
      {
        assetFileSize: {
          max: 2097152,
        },
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  circleInfo
    .createField("shortDescription")
    .name("一覧用紹介(概要)")
    .type("Text")
    .localized(false)
    .required(false)
    .validations([
      {
        size: {
          max: 400,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("largeImage")
    .name("詳細見出し用画像")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkMimetypeGroup: ["image"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Asset");

  circleInfo
    .createField("movieUrl")
    .name("詳細見出し用YouTube")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        regexp: {
          pattern:
            "https?://(www\\.youtube\\.com/watch\\?v=[a-zA-Z0-9\\-_]+)|(youtu\\.be/[a-zA-Z0-9\\-_]+)",
          flags: null,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("locationAndTime")
    .name("活動時間と時間")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);
  circleInfo
    .createField("contactUrl")
    .name("連絡先URL/メールアドレス")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  circleInfo
    .createField("contactPrivate")
    .name("担当者アドレス")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(true);
  circleInfo
    .createField("howToJoin")
    .name("入部方法")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("univ")
    .name("所属大学")
    .type("Symbol")
    .localized(false)
    .required(true)
    .validations([
      {
        in: [
          "京都工芸繊維大学",
          "京都府立医科大学",
          "京都府立大学",
          "複数大学合同",
        ],
      },
    ])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("images")
    .name("その他画像")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkMimetypeGroup: ["image"],
        },
        {
          assetFileSize: {
            min: null,
            max: 2097152,
          },
        },
      ],

      linkType: "Asset",
    });

  circleInfo
    .createField("description")
    .name("紹介文")
    .type("Text")
    .localized(false)
    .required(true)
    .validations([
      {
        size: {
          max: 5000,
        },
      },
    ])
    .disabled(false)
    .omitted(false);

  circleInfo
    .createField("files")
    .name("ファイル")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Link",

      validations: [
        {
          linkMimetypeGroup: ["presentation", "spreadsheet", "pdfdocument"],
        },
      ],

      linkType: "Asset",
    });

  circleInfo
    .createField("urls")
    .name("URLs")
    .type("Array")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false)
    .items({
      type: "Symbol",

      validations: [
        {
          regexp: {
            pattern:
              "^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$",
          },
        },
      ],
    });

  circleInfo.changeFieldControl("name", "builtin", "singleLine", {});

  circleInfo.changeFieldControl("category", "builtin", "entryLinksEditor", {
    bulkEditing: false,
  });

  circleInfo.changeFieldControl("image", "builtin", "assetLinkEditor", {});
  circleInfo.changeFieldControl(
    "shortDescription",
    "builtin",
    "multipleLine",
    {}
  );

  circleInfo.changeFieldControl("largeImage", "builtin", "assetLinkEditor", {
    helpText: "詳細用の大きな画像です。横長が好ましい",
  });

  circleInfo.changeFieldControl("movieUrl", "builtin", "urlEditor", {});
  circleInfo.changeFieldControl("locationAndTime", "builtin", "singleLine", {});
  circleInfo.changeFieldControl("contactUrl", "builtin", "singleLine", {});
  circleInfo.changeFieldControl("contactPrivate", "builtin", "singleLine", {});
  circleInfo.changeFieldControl("howToJoin", "builtin", "singleLine", {});
  circleInfo.changeFieldControl("univ", "builtin", "dropdown", {});
  circleInfo.changeFieldControl("images", "builtin", "assetLinksEditor", {});
  circleInfo.changeFieldControl("description", "builtin", "multipleLine", {});
  circleInfo.changeFieldControl("files", "builtin", "assetLinksEditor", {});

  circleInfo.changeFieldControl("urls", "builtin", "listInput", {
    helpText: "Insert comma separated values",
  });
};

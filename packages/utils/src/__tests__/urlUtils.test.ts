import { LinkObject, queryHandler, Route } from "../urlUtils";

describe("test queryHandler util function", () => {
  const tests = [
    { desc: "no values", q: {}, exp: {} },
    { desc: "one undefined value", q: { refName: undefined }, exp: {} },
    {
      desc: "undefined, defined value",
      q: { refName: undefined, active: "true" },
      exp: { active: "true" },
    },
    {
      desc: "empty string, defined value",
      q: { refName: "", active: "true" },
      exp: { active: "true" },
    },
    {
      desc: "two defined values",
      q: { refName: "main", active: "true" },
      exp: { refName: "main", active: "true" },
    },
  ];

  tests.forEach(test => {
    it(test.desc, () => {
      expect(queryHandler(test.q)).toEqual(test.exp);
    });
  });
});

describe("test Route class and methods", () => {
  const strLink = new Route("/repositories");
  const refQuery = {
    refName: "main",
  };
  const urlLink = strLink.addDynamic("ownerName", "taylor").withQuery(refQuery);

  const tests: Array<{ desc: string; link: Route; exp: LinkObject }> = [
    {
      desc: "String link, no adds",
      link: strLink,
      exp: { href: "/repositories", as: "/repositories" },
    },
    {
      desc: "String link, add static str",
      link: strLink.addStatic("profile"),
      exp: { href: "/repositories/profile", as: "/repositories/profile" },
    },
    {
      desc: "String link, add dynamic str",
      link: strLink.addDynamic("ownerName", "taylor"),
      exp: { href: "/repositories/[ownerName]", as: "/repositories/taylor" },
    },
    {
      desc: "String link, add static str with query",
      link: strLink.addStatic("database").withQuery(refQuery),
      exp: {
        href: { pathname: "/repositories/database", query: refQuery, hash: "" },
        as: { pathname: "/repositories/database", query: refQuery, hash: "" },
      },
    },
    {
      desc: "String link, add dynamic str with query",
      link: strLink.addDynamic("ownerName", "taylor").withQuery(refQuery),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]",
          query: refQuery,
          hash: "",
        },
        as: { pathname: "/repositories/taylor", query: refQuery, hash: "" },
      },
    },
    {
      desc: "String link, add dynamic str with query and hash",
      link: strLink
        .addDynamic("ownerName", "taylor")
        .withQuery(refQuery)
        .withHash("commithash"),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]",
          query: refQuery,
          hash: "commithash",
        },
        as: {
          pathname: "/repositories/taylor",
          query: refQuery,
          hash: "commithash",
        },
      },
    },
    {
      desc: "String link, add dynamic str with hash and query",
      link: strLink
        .addDynamic("ownerName", "taylor")
        .withHash("commithash")
        .withQuery(refQuery),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]",
          query: refQuery,
          hash: "commithash",
        },
        as: {
          pathname: "/repositories/taylor",
          query: refQuery,
          hash: "commithash",
        },
      },
    },
    {
      desc: "UrlObject link, no adds",
      link: urlLink,
      exp: {
        href: {
          pathname: "/repositories/[ownerName]",
          query: refQuery,
          hash: "",
        },
        as: { pathname: "/repositories/taylor", query: refQuery, hash: "" },
      },
    },
    {
      desc: "UrlObject link, add static str",
      link: urlLink.addStatic("commits"),
      exp: {
        href: "/repositories/[ownerName]/commits",
        as: "/repositories/taylor/commits",
      },
    },
    {
      desc: "UrlObject link, add dynamic str",
      link: urlLink.addDynamic("databaseName", "my-data"),
      exp: {
        href: "/repositories/[ownerName]/[databaseName]",
        as: "/repositories/taylor/my-data",
      },
    },
    {
      desc: "UrlObject link, add static str with query",
      link: urlLink.addStatic("commits").withQuery({
        ...refQuery,
        active: "Tables",
      }),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]/commits",
          query: { ...refQuery, active: "Tables" },
          hash: "",
        },
        as: {
          pathname: "/repositories/taylor/commits",
          query: { ...refQuery, active: "Tables" },
          hash: "",
        },
      },
    },
    {
      desc: "UrlObject link, add static str and dynamic str with query",
      link: urlLink
        .addStatic("commits")
        .addDynamic("refName", "main")
        .withQuery({ active: "Tables" }),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]/commits/[refName]",
          query: { active: "Tables" },
          hash: "",
        },
        as: {
          pathname: "/repositories/taylor/commits/main",
          query: { active: "Tables" },
          hash: "",
        },
      },
    },
    {
      desc: "UrlObject link, add static str with hash",
      link: urlLink.addStatic("commits").withHash("commithash"),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]/commits",
          hash: "commithash",
        },
        as: {
          pathname: "/repositories/taylor/commits",
          hash: "commithash",
        },
      },
    },
    {
      desc: "UrlObject link, add static str and dynamic str with hash",
      link: urlLink
        .addStatic("commits")
        .addDynamic("refName", "main")
        .withHash("commithash"),
      exp: {
        href: {
          pathname: "/repositories/[ownerName]/commits/[refName]",
          hash: "commithash",
        },
        as: {
          pathname: "/repositories/taylor/commits/main",
          hash: "commithash",
        },
      },
    },
  ];

  tests.forEach(test => {
    it(test.desc, () => {
      expect(test.link.href).toEqual(test.exp.href);
      expect(test.link.as).toEqual(test.exp.as);
    });
  });
});

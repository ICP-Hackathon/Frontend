import Search from "@/components/Search";

export default function searchPage() {
  return (
    <div>
      <Search />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Search",
    },
  };
}

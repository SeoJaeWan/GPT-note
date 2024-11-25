interface SectionItemProps {
  title: string;
  children: React.ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = (props) => {
  const { title, children } = props;

  return (
    <div className="flex-1 p-4 rounded bg-gray-800">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default SectionItem;

const documentFamilyParser = (family) => {
  switch (family) {
    case 'legislative':
    case 'Legislativo':
    case 'legislativo':
      return 'Legislativo';
    case 'executive':
    case 'Executivo':
    case 'executivo':
      return 'Executivo';
    default:
      return null;
  }
};

export default documentFamilyParser;

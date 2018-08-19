const userAudParser = (family) => {
  switch (family) {
    case 'client':
      return 'Cliente';
    case 'operator':
      return 'Operador';
    case 'collaborator':
      return 'Colaborador';
    case 'admin':
      return 'Administrador';
    default:
      return null;
  }
};

export default userAudParser;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const zonas = await prisma.catZona.findMany();
  if (zonas.length === 0) {
    console.log('No hay zonas en la base de datos.');
    return;
  }
  
  const defaultZona = zonas[0];
  
  const devs = await prisma.invDesarrollo.findMany({ where: { id_zona: null } });
  if (devs.length > 0) {
    console.log(`Asignando zona ${defaultZona.nombre} a ${devs.length} desarrollos...`);
    await prisma.invDesarrollo.updateMany({
      where: { id_zona: null },
      data: { id_zona: defaultZona.id_zona }
    });
    console.log('¡Zonas asignadas con éxito a los desarrollos existentes!');
  } else {
    console.log('Todos los desarrollos ya tienen zona asignada.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

const { exec } = require('node:child_process');

console.log('🟡 waiting for postgres to accepts connections...');

const checkPostgres = () => {
  exec(
    'docker exec postgres-dev pg_isready --host localhost',
    (err, stdout) => {
      if (stdout.search('accepting connections') === -1) {
        checkPostgres();
        return;
      }
      console.log('🟢 postgres ready to accepts connections!\n');
    },
  );
};

checkPostgres();

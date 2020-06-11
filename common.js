'use strict';

const {Spanner} = require('@google-cloud/spanner');
const projectId = 'binguo-learning-centre';
const instanceId = 'oasis-testing';
const databaseId = 'springdb';

const mySessionPoolOptions ={
    max: 100,
    maxIdle: 1,
    min: 100,
    idlesAfter: 1, 
};

const spanner = new Spanner({
    projectId: projectId,
  });

const instance = spanner.instance(instanceId);
const database = instance.database(databaseId,mySessionPoolOptions);

module.exports = {
  spanner,
  instance,
  database,
};
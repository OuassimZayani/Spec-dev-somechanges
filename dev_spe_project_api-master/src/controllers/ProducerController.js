const Producer = require('../models/ProducerModel');

exports.createProducer = async (req, res) => {
  try {
    // Extract producer data from the request body
    const { name, email, phone_number, address } = req.body;

    // Create a new producer document using the Producer model
    const producer = new Producer({
      name,
      email,
      phone_number,
      address,
    });

    // Save the producer to the database
    await producer.save();

    // Return a success response
    res.status(201).json({ message: 'Producer created successfully', producer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProducers = async (req, res) => {
    try {
      // Retrieve all producers from the database
      const producers = await Producer.find();
  
      // Return the list of producers
      res.status(200).json({ producers });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'No producers found' });
    }
  };
  
exports.getOneProducer = async (req, res) => {
    try {
      const producerId = req.params.id;
  
      // Retrieve the producer by ID from the database
      const producer = await Producer.findById(producerId);
  
      // Check if the producer exists
      if (!producer) {
        return res.status(404).json({ error: 'Producer not found' });
      }
  
      // Return the producer
      res.status(200).json({ producer });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Producer not found' });
    }
};
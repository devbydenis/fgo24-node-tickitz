'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const seats = [];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    // Generate seats untuk setiap theater
    const theaters = [
      { id: 1, capacity: 120 },
      { id: 2, capacity: 100 },
      { id: 3, capacity: 200 },
      { id: 4, capacity: 80 }, 
      { id: 5, capacity: 90 }, 
      { id: 6, capacity: 110 },
      { id: 7, capacity: 95 }, 
      { id: 8, capacity: 85 }  
    ];

    theaters.forEach(theater => {
      const rowCount = Math.ceil(theater.capacity / 10);
      let seatCount = 0;
      
      for (let row = 0; row < rowCount && seatCount < theater.capacity; row++) {
        const seatsInRow = Math.min(10, theater.capacity - seatCount);
        
        for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
          seats.push({
            theater_id: theater.id,
            seat_letter: letters[row],
            seat_number: seatNum,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          seatCount++;
        }
      }
    });

    await queryInterface.bulkInsert('seats', seats, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('seats', null, {});
  }
};

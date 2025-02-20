export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("QuizDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("quizHistory")) {
        db.createObjectStore("quizHistory", {
          keyPath: "id",
          autoIncrement: true,
        });
        console.log("📌 quizHistory store created!");
      }
    };

    request.onsuccess = (event) => {
      console.log("✅ IndexedDB Opened Successfully");
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error("❌ IndexedDB Failed to Open:", event.target.error);
      reject(event.target.error);
    };
  });
};

// Function to save quiz attempt
export const saveQuizAttempt = async (quizResult) => {
  console.log("📝 Attempting to save quiz:", quizResult);
  const db = await openDB();
  const tx = db.transaction("quizHistory", "readwrite");
  const store = tx.objectStore("quizHistory");

  const request = store.add({
    ...quizResult,
    date: new Date().toISOString(), // ✅ Ensure correct property name
  });

  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      console.log("✅ Quiz attempt saved! ID:", event.target.result);
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      console.error("❌ Failed to save quiz attempt.", event.target.error);
      reject(event.target.error);
    };
  });
};

// Function to get all past quiz attempts
export const getQuizHistory = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("quizHistory", "readonly");
    const store = tx.objectStore("quizHistory");
    const request = store.getAll();

    request.onsuccess = () => {
      console.log("📌 Retrieved Quiz History:", request.result);
      if (request.result.length === 0) {
        console.warn("⚠️ No quiz history found in IndexedDB.");
      }
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error("❌ Failed to retrieve quiz history.", event.target.error);
      reject(event.target.error);
    };
  });
};

// Function to clear quiz history
export const clearQuizHistory = async () => {
  const db = await openDB();
  const tx = db.transaction("quizHistory", "readwrite");
  const store = tx.objectStore("quizHistory");

  store.clear();

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => {
      console.log("✅ Quiz history cleared.");
      resolve();
    };
    tx.onerror = (event) => {
      console.error("❌ Failed to clear quiz history.", event.target.error);
      reject(event.target.error);
    };
  });
};

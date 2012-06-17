var db;
/*
* Copyright 2012 BB Jam Polska (bbjam.pl).
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function InitializeDatabase() {
	
// Database will be opened or created if not exist.
// Otwieramy lub tworzymy bazę danych w przypadku gdy nie istnieje.	
 db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);	

db.transaction(function (tx) {  
// Next we need a table so we are creating it if not exists.
// Następnie musimy utworzyć table jeżeli jeszcze nie istnieje.
   tx.executeSql('CREATE TABLE IF NOT EXISTS MYTEXT (id unique, text)');
});

GetText();
	
}

function SaveText() {
	// We are getting our input text from input element
	// Pobieramy tekst z elementu input
	var inputResult = document.getElementById("inputElement").value;
	
	// This example is very simple so we will only update the text value in row number 1. We need to use "INSERT OR REPLACE"
	// because if row won't exsist we will use INSERT or if exists REPLACE.
	// W tym prostym przykładzie będziemy aktualizować informację tylko w wierszu 1 używając polecenia "INSERT OR REPLACE"
	// ze względu na fakt, że jeżeli wiersz nie istnieje należy go stworzyć lub zaktualizować w przeciwnym wypadku.
	db.transaction(function (tx) {  
	tx.executeSql("INSERT OR REPLACE INTO MYTEXT (id, text) VALUES (1, ?)", [inputResult]);
	});
	
	alert("Element saved.");
	clearInput();
	
}

function GetText() {
	// In this case we are getting all elements from MYTEXT table and then displaying only text value from first row.
	// W typ wypadku pobieramy wszystkie elementy z tabeli MYTEXT a następnie wyświetlamy wartość pola text z pierwszego rzędu.
	db.transaction(function (tx) {
	tx.executeSql('SELECT * FROM MYTEXT', [], function (tx, results) {
		// Checking if element exsist
		// Sprawdzanie czy element istnieje
		if (typeof(results.rows.item(0).text) !== "undefined") {
			// Set the text value to input element
			// Ustaw tekst elementu input
			document.getElementById("inputElement").value = results.rows.item(0).text;	
		} else {
			// Or display an error when element is not exsist
			// Lub wyświetl błąd jeżeli element nie istnieje
			alert("Database is empty.");
		}	
	});
	});
	

	   
}

function ClearText() {
	// To clear database
	// Aby wyczyścić bazę danych
	db.transaction(function (tx) {  
	tx.executeSql("DROP TABLE MYTEXT", []);
	});
	

	alert("Database clear.");
	clearInput();
}

// Sample function to clear input field after operation.
// Prost funkcja czyszcząca pole input po wykonaniu danej operacji.

function clearInput() {
	
	document.getElementById("inputElement").value = "";
}
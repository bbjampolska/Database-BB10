/*
* Copyright 2010-2011 BB Jam Polska (bbjam.pl).
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

function SaveText() {
	// We are getting our input text from input element
	// Pobieramy tekst z elementu input
	var inputResult =  document.getElementById("inputElement").value;
	
	// Next we need to create database element and save our text.
	// Następinie tworzymy bazę danych i zapisujemy nasz tekst.
	localStorage.setItem("databaseName", inputResult);
	
	alert("Element saved.");
	clearInput();
	
}

function GetText() {
	//  Initiating our database
	// Inicjowanie bazy danych
	var databaseElement = localStorage.getItem("databaseName");
	
	// Checking if element exsist
	// Sprawdzanie czy element istnieje
	if (databaseElement) {
		
		//Set the text value to input element
		//Ustaw tekst elementu input
		document.getElementById("inputElement").value = databaseElement;
	} else {
		// Or display an error when element is not exsist
		// Lub wyświetl błąd jeżeli element nie istnieje
		alert("Database is empty.");
	}
	   
}

function ClearText() {
	// To clear database
	// Aby wyczyścić bazę danych
	localStorage.removeItem("databaseName");
	

	alert("Database clear.");
	clearInput();
}

// Sample function to clear input field after operation.
// Prost funcka czyszcząca pole input po wykonaniu danej operacji.

function clearInput() {
	
	document.getElementById("inputElement").value = "";
}
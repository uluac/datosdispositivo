//alertas del dispositivo

function pgAlert(mess){
	var title=$('title').text();
	var btnName='Aceptar';
	function error(){
		//alert(mess);
	}
	navigator.notification.alert(mess, error, title, btnName);
}
//Datos del dispositivo
/*function deviceData(){
	$('#devic table td').eq(1).text(device.name);
	$('#devic table td').eq(3).text(device.phonegap);
	$('#devic table td').eq(5).text(device.platform);
	$('#devic table td').eq(7).text(device.version);
	$('#devic table td').eq(9).text(device.uuid);
}
//Historial de Eventos
function eventHistory(action){
	$('#eventsHistory').append('<li>'+action+'</li>');
}*/
//Contactos en el dispositivo
function readContacts(){
	navigator.contacts.find(["*"], function(contactoss){
		var contactosList='';
		for(i=0;i<contactoss.length;i++){
			var contactoo = contactoss[i];
			contactosList += '<li><a href="tel://'+contactoo.phoneNumbers[0].value+'">'+contactoo.name.formatted+'</a></li>';
			$('#contactsList').html(contactosList);
		}
	}, function(){
		pgAlert('No se han podido leer los contactos');
	});
}
//Crear contactos
function newContact(){
	if($('#contDispley').val() != '' && $('#contName').val() != '' && $('#contFamily').val() != '' && $('#contPhone').val() != ''){
		//alert($('#contDispley').val()+'-'+$('#contName').val()+'-'+$('#contFamily').val()+'-'+$('#contPhone').val());
		var contacto = navigator.contacts.create();
		//Nombre para mostrar
		contacto.displayName = $('#contDispley').val();
		//Nombre del Contacto
		contacto.name = new CountactName();
		contacto.name.givenName = $('#contName').val();
		contacto.name.familyName = $('#contFamily').val();
		//Teléfono
		var tel = ($('#contPhone').val()).substring(0,3)+'-'+($('#contPhone').val()).substring(3,3)+'-'+($('#contPhone').val()).substring(6,4);
		contacto.phoneNunbers = [];
		contacto.phoneNumbers[0] = new ContactField("mobile", tel, true);//p1("home","mobile","work") - p2(cadena de texto con formato 123-456-7890) - p3(true, false)
		
		contacto.save(function(){//Guardar al contacto
			pgAlert("Grabado Correctamente");
		}, function(){
			pgAlert("No se pudo Guardar");
		});
		//Reintento
		// create a new contact object
		var elContact = navigator.contacts.create();
		elContact.displayName = $('#contDispley').val();
		elContact.nickname = $('#contDispley').val();       //specify both to support all devices

		// populate some fields
		var name = new ContactName();
		name.givenName = $('#contName').val();
		name.familyName = $('#contFamily').val();
		elContact.name = name;
		var tel = ($('#contPhone').val()).substring(0,3)+'-'+($('#contPhone').val()).substring(3,6)+'-'+($('#contPhone').val()).substring(6,10);
		var phone = [];
		phone[0] = new ContactField('mobile', tel, true);
		elContact.phoneNumbers = phone;

		// save to device
		elContact.save(function(){
			//correcto
			pgAlert("Grabado Correctamente");
		}, function(contactError){
			//error
			pgAlert("No se pudo Guardar: "+contactError.code);
		});
		//Volver a leer contactos
		readContacts();
	}else{
		pgAlert("Tienes que llenar todos los campos");
	}
}
//Lectura de archivos
function readFiles(){
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile('read-write.txt', null, function(archivo){
			archivo.file(function(archivo){
				var lector = new FileReader();
				lector.onloadend = function(e){
					alert(e.target.result);
				}
				lector.readAsDataURL(file);
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});
		},
		function(err){
			pgAlert("No se pudo acceder al sistema de archivos");
		});
	},
	function(err){
		pgAlert("No se pudo acceder al sistema de archivos");
	});
}
//Escritura de archivos
function writeFiles(){
	var content = $('#fileContent').val();
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile('read-write.txt', { create: true }, function(archivo){
			archivo.createWriter(function(escritor){
				escritor.onwrite = function(e){
					pgAlert("El archivo fue escrito Correctamente!");
				};
				escritor.write(content);
			}, function(){
				pgAlert("No existe el archivo, agrega contenido y luego presiona en Escribir");
			});
		}, function(err){
			pgAlert("No se pudo acceder al sistema de archivos");
		});
	}, function(err){
		pgAlert("No se pudo acceder al sistema de archivos");
	});
}
/*$(document).ready(function(){
	document.addEventListener("deviceready", function(){
		deviceData();//Datos del dispositivo
		//Eventos
			document.addEventListener("pause", function(){//Al pausar la aplicaci�n
				eventHistory('La aplicaci&oacute;n se paus&oacute;');
			}, false);
			document.addEventListener("resume", function(){//Al volver a la aplicaci�n
				eventHistory('La aplicaci&oacute;n se reinici&oacute;');
			}, false);
			document.addEventListener("online", function(){//Al conectarse a la red
				eventHistory('La aplicaci&oacute;n se ha conectado');
			}, false);
			document.addEventListener("offline", function(){//Al desconectarse de la red
				eventHistory('La aplicaci&oacute;n se ha desconectado');
			}, false);
		
		readContacts();//Leer Contactos
		readFiles();//Leer Archivos
		//Acciones de formularios
			$('.sendForm').click(function(){
				switch($(this).parents('ul').attr('id')){
					case 'newContact':
						newContact();
						break;
					case 'playFiles':
						writeFiles();
						break;
				}
				
			});
	}, false);
});*/
$(document).ready(function(){
	document.addEventListener("deviceready",function(){
		//Informaci�n del dispositivo
		$('#devic table td').eq(1).text(device.name);
		$('#devic table td').eq(3).text(device.phonegap);
		$('#devic table td').eq(5).text(device.platform);
		$('#devic table td').eq(7).text(device.version);
		$('#devic table td').eq(9).text(device.uuid);
		//Historial Eventos
		document.addEventListener("pause", function(){//Al pausar la aplicaci�n
			eventHistory('La aplicaci&oacute;n se paus&oacute;');
		}, false);
		document.addEventListener("resume", function(){//Al volver a la aplicaci�n
			eventHistory('La aplicaci&oacute;n se reinici&oacute;');
		}, false);
		document.addEventListener("online", function(){//Al conectarse a la red
			eventHistory('La aplicaci&oacute;n se ha conectado');
		}, false);
		document.addEventListener("offline", function(){//Al desconectarse de la red
			eventHistory('La aplicaci&oacute;n se ha desconectado');
		}, false);
		//Contactos
		readContacts();
		//Acciones de formularios
		$('.sendForm').click(function(){
			switch($(this).parents('ul').attr('id')){
				case 'nueContact':
					newContact();
					break;
				case 'playFiles':
					writeFiles();
					break;
			}
			
		});
		//archivos
		readFiles();
	}, false);
});
function eventHistory(action){
	$('#eventsHistory').append('<li>'+action+'</li>');
}
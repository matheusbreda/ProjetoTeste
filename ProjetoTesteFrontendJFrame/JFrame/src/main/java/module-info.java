module portaria {

	exports br.com.syma.jframe.sli.view;
	exports br.com.syma.jframe.sli.dto;
	exports br.com.syma.jframe.sli;

	requires CIDBio;
	requires com.fasterxml.jackson.core;
	requires com.fasterxml.jackson.databind;
	requires com.fasterxml.jackson.annotation;
	requires com.fasterxml.jackson.datatype.jsr310;
	requires transitive java.desktop;
	requires java.xml.bind;
	requires jcalendar;
	requires static lombok;
	requires transitive org.json;
	requires spring.core;
	requires spring.web;
	requires java.smartcardio;
	requires webcam.capture;
	
	requires java.prefs;
	requires org.apache.httpcomponents.httpclient;
	requires org.apache.httpcomponents.httpcore;
	requires jna;
	requires java.sql;
	//requires org.apache.pdfbox;
}
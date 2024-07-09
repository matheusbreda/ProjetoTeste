package br.com.syma.jframe.sli.view;

import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Properties;
import java.util.prefs.Preferences;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.JPasswordField;
import javax.swing.KeyStroke;
import javax.swing.UIManager;
import javax.swing.border.LineBorder;
/*
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName;
*/
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import br.com.syma.jframe.sli.dto.AuthRequest;

import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.KeyAdapter;



public class TelaLogin extends JFrame {
	

	private static final long serialVersionUID = 1L;
	
	private static String operationalSystem = System.getProperty("os.name").toLowerCase();
	private static String config_file = "application.properties";
	private static String current_dir = "";

	public  static String enderecoServer = "http://localhost:1998";
	public  static String accessToken = "";
	public  static String loginCorrente = "";
	public  static String loginPessoaId = "";
	
	
	
	public  JPasswordField  jtextSenha;
	public  JTextField      jtextLogin;
	private	Preferences  	prefs;
	
	public static void readAppProperties () {
	
		String dir_separator = "/";
		if (operationalSystem.contains("win")) { dir_separator = "\\"; };
		Properties p = new Properties();
	
		try {
		
			current_dir = new java.io.File( "." ).getCanonicalPath();		
			p.load(new FileInputStream(current_dir + dir_separator + config_file));
			
			
			enderecoServer = p.getProperty("SERVER").trim();
			if (enderecoServer != null) enderecoServer = "http://" + enderecoServer;
		
		} catch (FileNotFoundException e) {
			System.out.println("Arquivo não encontrado: " + current_dir + dir_separator + config_file);
			System.out.println("Crie a opção SERVER=<ip>:<porta>");
			System.exit(1);
		} catch (Exception e) {
		}
		
	}
		
	public static void main(String[] args) {
		
		new TelaLogin().setVisible(true);
		
	}
	
	public TelaLogin() {
		
		addWindowListener(new WindowAdapter() {
			@Override
			public void windowOpened(WindowEvent e) {
				prefs = Preferences.userRoot().node(this.getClass().getName());
				loginCorrente = prefs.get("ULTIMO.LOGIN", "");
				
				if (loginCorrente.length() > 2) {
					jtextLogin.setText(loginCorrente);
					jtextSenha.requestFocus();
				} else {
					jtextLogin.requestFocus();
				}
			}
		});
		
		
		
		try {

			prefs = Preferences.userRoot().node(this.getClass().getName());
			loginCorrente = prefs.get("ULTIMO.LOGIN", "");
			
			setIconImage(Toolkit.getDefaultToolkit().getImage("icon.png"));
			UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
			setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			setTitle("BHZ Portaria - Login");
			setResizable(false);
			setSize(350, 220); 
			Dimension ds = Toolkit.getDefaultToolkit().getScreenSize();	Dimension dw = getSize(); 
			setLocation((ds.width - dw.width) / 2, (ds.height - dw.height) / 2);
			
					
			final JLabel jlabelLogin = new JLabel("LOGIN: ");
			jlabelLogin.setBounds(39, 40, 57, 14);
			final JLabel jlabelSenha = new JLabel("SENHA: ");
			jlabelSenha.setBounds(39, 71, 57, 14);

			jtextLogin = new JTextField("");
			jtextLogin.setBounds(106, 37, 168, 20);
			
			jtextSenha = new JPasswordField ("");
			jtextSenha.setBounds(106, 67, 168, 20);

			final JButton jbuttonOk = new JButton("OK");
			jbuttonOk.setBounds(62, 150, 100, 23);
			final JButton jbuttonCancelar = new JButton("Cancelar");
			jbuttonCancelar.setBounds(171, 150, 100, 23);

			JPanel panel01 = new JPanel();
			panel01.setBorder(new LineBorder(UIManager.getColor("Button.shadow")));
			panel01.setBounds(10, 11, 314, 128);
			panel01.setLayout(null);
			panel01.add(jlabelLogin);
			panel01.add(jlabelSenha);
			panel01.add(jtextLogin);
			panel01.add(jtextSenha);


			getContentPane().setLayout(null);
			getContentPane().add(panel01);
			getContentPane().add(jbuttonOk);
			getContentPane().add(jbuttonCancelar);
			
			
			
			
			// BOTAO OK
			jbuttonOk.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					doOkAction();
				}
				
			});

			// BOTAO CANCELAR
			jbuttonCancelar.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					System.exit(0);
				}
			});

			// ENTER CAMPO SENHA
			jtextSenha.addKeyListener(new KeyAdapter() {
				@Override
				public void keyPressed(KeyEvent e) {
					char ch = e.getKeyChar();
					if (ch == KeyEvent.VK_ENTER) {
						doOkAction();
					}
				}
			});
			
			
			// EXIT on ESCAPE
			((JComponent) getContentPane()).registerKeyboardAction(new ActionListener() {
                public void actionPerformed(ActionEvent e) { System.exit(0); }
            }, KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0), JComponent.WHEN_ANCESTOR_OF_FOCUSED_COMPONENT);
			
			
			readAppProperties();
			
			System.out.println("========================================================");
			System.out.println("Server: " + enderecoServer);
			System.out.println("========================================================");
			System.out.println("Using config file: " + current_dir + "/" + config_file);
			
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
	}
	
	public void doOkAction() {
		
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		AuthRequest authrequest = new AuthRequest();
		ResponseEntity<String> resposta;
		JSONObject jsonObject1,jsonObject2;
		
		authrequest.setLogin(jtextLogin.getText());
		authrequest.setPassword(new String(jtextSenha.getPassword()));
		
		jsonObject1 = new JSONObject(authrequest);
		
		String url = enderecoServer + "/api/auth/login";
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		try {

			HttpEntity<String> entity1 = new HttpEntity<String>(jsonObject1.toString(), headers);
			resposta = restTemplate.exchange(url, HttpMethod.POST, entity1, String.class, 100);
			jsonObject2 = new JSONObject(resposta);

			if (jsonObject2.getInt("statusCodeValue") == 200) {
				
				loginCorrente = authrequest.getLogin();
				
				jsonObject2 = new JSONObject(resposta.getBody());
				System.out.println(jsonObject2.getString("accessToken"));
				accessToken = jsonObject2.getString("accessToken");
				
				
				prefs.put("ULTIMO.LOGIN", loginCorrente);
				
				
				//getPessoaFromLogin(loginCorrente);
				new TelaVenda().setVisible(true);
				setVisible(false);
				
			} else {
				JOptionPane.showMessageDialog(null, "Erro Status Code Response: " + jsonObject2.getInt("statusCodeValue") );
			}
			
		} catch ( HttpClientErrorException ex ) {
			if (ex.getRawStatusCode() == 401) {
				JOptionPane.showMessageDialog(null, "SENHA OU LOGIN INCORRETOS");
			} else {
				JOptionPane.showMessageDialog(null, "HTTP ERROR: " + ex.getRawStatusCode());
			}
		} catch ( ResourceAccessException ex ) {
			JOptionPane.showMessageDialog(null, "\nSem acesso ao servidor: " + enderecoServer 
					+ "\n\n Verifique se o serviço está disponivel e verifique sua condexão de rede!  \n\n", "Erro de conexão", JOptionPane.WARNING_MESSAGE);
		} catch ( Exception ex ) {
			JOptionPane.showMessageDialog(null, "HTTP ERROR: " +  ex.getClass() + " | " + ex.getMessage());
		}
	}

}

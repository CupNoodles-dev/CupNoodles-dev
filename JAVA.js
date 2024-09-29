import java.io.IOException;
import javax.mail.*;
import javax.mail.internet.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/sendEmail")
public class EmailServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        String name = request.getParameter("name");
        String userEmail = request.getParameter("email");
        String message = request.getParameter("message");

        String to = "notedeath488@gmail.com"; // Change to your email
        String subject = "New Message from " + name;
        String body = "You have received a new message:\n\n" +
                      "From: " + name + "\n" +
                      "Email: " + userEmail + "\n\n" +
                      "Message:\n" + message;

        // Set up mail server
        Properties props = new Properties();
        props.put("mail.smtp.host", "notedeath488@gmail.com"); // SMTP server
        props.put("mail.smtp.port", "587"); // SMTP port
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        // Get the Session object
        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("notedeath488@gmail.com", "72854632432"); // Change to your credentials
            }
        });

        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("your-email@example.com"));
            msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
            msg.setSubject(subject);
            msg.setText(body);

            Transport.send(msg);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

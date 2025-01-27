import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class FacebookLoginBackend {
    public static void main(String[] args) {
        SpringApplication.run(FacebookLoginBackend.class, args);
    }
}

@RestController
@RequestMapping("/api/auth")
class LoginController {

    // Mock database of users
    private static final Map<String, String> USER_DATABASE = new HashMap<>() {{
        put("user@example.com", "password123"); // email -> password
        put("john.doe@example.com", "securepass");
    }};

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();

        String email = request.getEmail();
        String password = request.getPassword();

        if (USER_DATABASE.containsKey(email) && USER_DATABASE.get(email).equals(password)) {
            response.put("status", "success");
            response.put("message", "Login successful!");
            response.put("user", email);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid email or password.");
        }

        return response;
    }
}

class LoginRequest {
    private String email;
    private String password;

    // Getters and setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

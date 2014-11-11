package hu.tilos.radio.backend;

import hu.radio.tilos.model.User;
import hu.tilos.radio.backend.data.UserInfo;

import javax.enterprise.context.RequestScoped;

/**
 * Please note that this is a request scoped bean based on token authentication.
 */
@RequestScoped
public class Session {

    private User currentUser;

    public User getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(User currentUser) {
        this.currentUser = currentUser;
    }
}
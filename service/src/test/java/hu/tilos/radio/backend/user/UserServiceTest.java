package hu.tilos.radio.backend.user;

import com.github.fakemongo.junit.FongoRule;
import hu.tilos.radio.backend.GuiceRunner;
import hu.tilos.radio.backend.Session;
import org.dozer.DozerBeanMapper;
import org.junit.Rule;
import org.junit.Test;

import javax.inject.Inject;

import static hu.tilos.radio.backend.MongoTestUtil.loadTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class UserServiceTest {

    @Rule
    public GuiceRunner guice = new GuiceRunner(this);

    @Inject
    FongoRule fongoRule;

    @Inject
    Session session;

    @Inject
    UserService controller;

    @Inject
    DozerBeanMapper mapper;

    @Rule
    public FongoRule fongoRule() {
        return fongoRule;
    }

    @Test

    public void me() {
        //given
        String authorId = loadTo(fongoRule, "author", "author-author1.json");
        loadTo(fongoRule, "user", "user-1.json", authorId);
        session.setCurrentUser(mapper.map(fongoRule.getDB().getCollection("user").findOne(), UserInfo.class));


        //when
        UserInfo me = controller.me(session);

        //then
        assertThat(me.getUsername(), equalTo("bela"));

    }


}